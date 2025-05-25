import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../store.ts";
import { fetchMovies } from "../slices/moviesListSlice.ts";
import type { Movie } from "../movieTypes.ts";
import MovieDetails from "./MovieDetails.tsx";
import Header from "../components/Header.tsx";

function MoviesList() {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) return <p>Loading Movies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="movies-container">
      <Header />

      <table>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.title} onClick={() => setSelectedMovie(movie)}>
              <td>{movie.episode_id}</td>
              <td>{movie.title}</td>
              <td>{movie.rating}</td>
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
