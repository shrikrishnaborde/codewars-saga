import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Movie, Rating } from "../movieTypes";

/**
 * Redux state for movies list.
 */
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

/**
 * Async thunk to fetch movies from the Star Wars API and enrich them
 * with additional ratings from the OMDB API.
 *
 * @returns {Promise<Movie[]>} - Array of enriched Movie objects
 */
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

          // Extract and parse rating values
          const rtRatingData = movieData.Ratings?.find(
            (r: Rating) => r.Source === "Rotten Tomatoes"
          )?.Value;
          const imdbRatingData = movieData.Ratings?.find(
            (r: Rating) => r.Source === "Internet Movie Database"
          )?.Value;
          const metaRatingData = movieData.Ratings?.find(
            (r: Rating) => r.Source === "Metacritic"
          )?.Value;

          const rtRating = parseFloat(rtRatingData); // e.g. "93%"
          const imdbRating = parseFloat(imdbRatingData) * 10; // Convert 8.8 to 88
          const metaRating = parseFloat(metaRatingData.split("/")[0]); // "80/100" -> 80

          // Return enriched movie object
          return {
            ...movie,
            ratings: {
              rtRating,
              imdbRating,
              metaRating,
            },
            averageRating:
              Math.floor((rtRating + imdbRating + metaRating) / 3) || 0,
            poster: movieData.Poster,
          };
        } catch (error) {
          // Return base movie without ratings if OMDB fails
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

/**
 * Redux slice to manage movie list state and async loading lifecycle.
 */
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
