import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Movie, Rating } from "../movieTypes";

interface MoviesListState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MoviesListState = {
  movies: [],
  loading: false,
  error: null,
};

function calculateAverageRating(
  ratings: { Source: string; Value: string }[]
): number {
  const normalizedRatings: number[] = ratings
    .map((rating) => {
      const { Value } = rating;

      if (Value.endsWith("%")) {
        // e.g., "94%" → 94
        return parseFloat(Value);
      } else if (Value.includes("/")) {
        const [scoreStr, maxStr] = Value.split("/");
        const score = parseFloat(scoreStr);
        const max = parseFloat(maxStr);
        if (!isNaN(score) && !isNaN(max)) {
          return (score / max) * 100;
        }
      }

      return NaN;
    })
    .filter((r) => !isNaN(r));

  if (normalizedRatings.length === 0) return 0;

  const sum = normalizedRatings.reduce((a, b) => a + b, 0);
  return +(sum / normalizedRatings.length).toFixed(2); // rounded to 2 decimal places
}

export const fetchMovies = createAsyncThunk<Movie[]>(
  "movies/fetchMovies",
  async () => {
    const response = await fetch(
      "https://swapi.py4e.com/api/films/?format=json"
    );
    const data = await response.json();

    const moviesWithRatings: Movie[] = await Promise.all(
      data.results.map(async (movie: Movie) => {
        const releaseYear = new Date(movie.release_date).getFullYear();
        const omdbUrl = `https://www.omdbapi.com/?apikey=${
          import.meta.env.VITE_OMDB_API_KEY
        }&t=${encodeURIComponent(movie.title)}&y=${releaseYear}`;

        try {
          const result = await fetch(omdbUrl);
          const movieData = await result.json();

          const rtRatingData = movieData.Ratings?.find(
            (r: Rating) => r.Source === "Rotten Tomatoes"
          )?.Value;
          const imdbRatingData = movieData.Ratings?.find(
            (r: Rating) => r.Source === "Internet Movie Database"
          )?.Value;
          const metaRatingData = movieData.Ratings?.find(
            (r: Rating) => r.Source === "Metacritic"
          )?.Value;

          const rtRating = parseFloat(rtRatingData);
          const imdbRating = parseFloat(imdbRatingData) * 10;
          const metaRating = parseFloat(metaRatingData.split("/")[0]);

          return {
            ...movie,
            rtRating,
            imdbRating,
            metaRating,
            rating: Math.floor((rtRating + imdbRating + metaRating) / 3) || 0,
          };
        } catch (error) {
          return {
            ...movie,
            rating: 0,
          };
        }
      })
    );

    return moviesWithRatings;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch movies";
      });
  },
});

export default moviesSlice.reducer;
