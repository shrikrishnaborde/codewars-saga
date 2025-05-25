import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../../store";
import type { Movie } from "../../movieTypes";
import { fetchMovies } from "../../slices/moviesListSlice";
import Header from "../../components/Header";
import MovieDetails from "../movie-details/MovieDetails";
import toRoman from "../../utils/toRoman";
import renderStars from "../../utils/renderStars";

type SortKey = "title" | "averageRating" | "release_date" | "episode_id";
type SortDirection = "asc" | "desc";

/**
 * MoviesList Component
 *
 * Displays a searchable, sortable list of movies.
 * On selecting a movie, details appear in the MovieDetails section.
 */
function MoviesList() {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchText, setSearchText] = useState("");

  const [sortKey, setSortKey] = useState<SortKey>("title");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  /**
   * Fetch movies on component mount.
   */
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  /**
   * Re-filter and re-sort movies when movies, search text,
   * or sorting preferences change.
   */
  useEffect(() => {
    searchMovies();
  }, [movies, searchText, sortKey, sortDirection]);

  /**
   * Filters and sorts the movie list.
   * Filters by title using case-insensitive match.
   * Sorts based on the selected column and direction.
   *
   * @returns void
   */
  const searchMovies = (): void => {
    const filteredMoviesBySearchText = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const sortedMovies = [...filteredMoviesBySearchText].sort((a, b) => {
      const valA = a[sortKey] as string | number;
      const valB = b[sortKey] as string | number;

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredMovies(sortedMovies);
  };

  /**
   * Handles column header click to sort by key.
   * Toggles between ascending and descending if the same key is clicked.
   *
   * @param {SortKey} key - Column key to sort by.
   * @returns void
   */
  const sortMovies = (key: SortKey): void => {
    const isSameKey = key === sortKey;
    const newDirection = isSameKey && sortDirection === "asc" ? "desc" : "asc";

    setSortKey(key);
    setSortDirection(newDirection);
  };

  // Handle loading and error states
  if (loading) return <p>Loading Movies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="movies">
      {/* Header with search input */}
      <Header searchMovie={setSearchText} />

      <div className="movies-container">
        {/* Movie list header row with sortable columns */}
        <div className="movies-list flex-table">
          <div className="flex-row header-row">
            <div className="flex-cell" onClick={() => sortMovies("episode_id")}>
              Episode #
              <span className="material-icons">
                {sortKey === "episode_id"
                  ? sortDirection === "asc"
                    ? "arrow_upward"
                    : "arrow_downward"
                  : "unfold_more"}
              </span>
            </div>
            <div
              className="flex-cell movie-title"
              onClick={() => sortMovies("title")}
            >
              Title
              <span className="material-icons">
                {sortKey === "title"
                  ? sortDirection === "asc"
                    ? "arrow_upward"
                    : "arrow_downward"
                  : "unfold_more"}
              </span>
            </div>
            <div
              className="flex-cell rating"
              onClick={() => sortMovies("averageRating")}
            >
              Rating
              <span className="material-icons">
                {sortKey === "averageRating"
                  ? sortDirection === "asc"
                    ? "arrow_upward"
                    : "arrow_downward"
                  : "unfold_more"}
              </span>
            </div>
            <div
              className="flex-cell"
              onClick={() => sortMovies("release_date")}
            >
              Release Year
              <span className="material-icons">
                {sortKey === "release_date"
                  ? sortDirection === "asc"
                    ? "arrow_upward"
                    : "arrow_downward"
                  : "unfold_more"}
              </span>
            </div>
          </div>

          {/* Movie rows */}
          {filteredMovies.map((movie) => (
            <div
              key={movie.title}
              className={`flex-row body-row ${
                movie.title === selectedMovie?.title && "selected-movie"
              }`}
              onClick={() => setSelectedMovie(movie)}
            >
              <div className="flex-cell">EPISODE {movie.episode_id}</div>
              <div className="flex-cell movie-title">
                Episode {toRoman(+movie.episode_id)} - {movie.title}
              </div>
              <div className="flex-cell rating">
                {renderStars(movie.averageRating ?? 0)}
              </div>
              <div className="flex-cell">{movie.release_date}</div>
            </div>
          ))}
        </div>

        {/* Movie detail viewer */}
        <MovieDetails movie={selectedMovie} />
      </div>
    </div>
  );
}

export default MoviesList;
