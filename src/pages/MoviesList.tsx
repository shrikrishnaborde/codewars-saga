import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../store.ts";
import { fetchMovies } from "../slices/moviesListSlice.ts";
import type { Movie } from "../movieTypes.ts";
import MovieDetails from "./MovieDetails.tsx";
import Header from "../components/Header.tsx";

type SortKey = "title" | "rating" | "release_date" | "episode_id";
type SortDirection = "asc" | "desc";

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

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    searchMovies();
  }, [movies, searchText, sortKey, sortDirection]);

  const searchMovies = () => {
    const filteredMoviesBySearchText = movies.filter((movie) => {
      if (movie.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
        return movie;
    });

    const sortedMovies = [...filteredMoviesBySearchText].sort((a, b) => {
      const valA = a[sortKey] as string | number;
      const valB = b[sortKey] as string | number;

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredMovies(sortedMovies);
  };

  const sortMovies = (key: SortKey) => {
    const isSameKey = key === sortKey;
    const newDirection = isSameKey && sortDirection === "asc" ? "desc" : "asc";

    setSortKey(key);
    setSortDirection(newDirection);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating / 10);
    const halfStars = rating === 100 || rating % 10 === 0 ? 0 : 1;
    const emptyStars = 10 - fullStars - halfStars;

    return (
      <>
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <span
              key={`full-${i}`}
              className="material-icons"
              style={{ color: "#FFD700" }}
            >
              star
            </span>
          ))}

        {halfStars > 0 && (
          <span className="material-icons" style={{ color: "#FFD700" }}>
            star_half
          </span>
        )}

        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <span key={`empty-${i}`} className="material-icons">
              star_border
            </span>
          ))}
      </>
    );
  };

  if (loading) return <p>Loading Movies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="movies-container">
      <Header searchMovie={setSearchText} />

      <table>
        <thead>
          <tr>
            <th onClick={() => sortMovies("episode_id")}>
              Episode #
              <span className="material-icons">
                {sortKey === "episode_id"
                  ? sortDirection === "asc"
                    ? "arrow_upward"
                    : "arrow_downward"
                  : "unfold_more"}
              </span>
            </th>
            <th onClick={() => sortMovies("title")}>
              Title
              <span className="material-icons">
                {sortKey === "title"
                  ? sortDirection === "asc"
                    ? "arrow_upward"
                    : "arrow_downward"
                  : "unfold_more"}
              </span>
            </th>
            <th onClick={() => sortMovies("rating")}>
              Rating
              <span className="material-icons">
                {sortKey === "rating"
                  ? sortDirection === "asc"
                    ? "arrow_upward"
                    : "arrow_downward"
                  : "unfold_more"}
              </span>
            </th>
            <th onClick={() => sortMovies("release_date")}>
              Release Year
              <span className="material-icons">
                {sortKey === "release_date"
                  ? sortDirection === "asc"
                    ? "arrow_upward"
                    : "arrow_downward"
                  : "unfold_more"}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredMovies.map((movie) => (
            <tr key={movie.title} onClick={() => setSelectedMovie(movie)}>
              <td>{movie.episode_id}</td>
              <td>{movie.title}</td>
              <td>{renderStars(movie.rating ?? 0)}</td>
              <td>{movie.release_date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <MovieDetails movie={selectedMovie} />
    </div>
  );
}

export default MoviesList;
