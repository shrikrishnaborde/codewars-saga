import type { Movie } from "../movieTypes";

type MovieDetailsProps = {
  movie: Movie | null;
};

function MovieDetails({ movie }: MovieDetailsProps) {
  if (!movie) return <div>Select a movie</div>;

  return <div>{movie.title}</div>;
}

export default MovieDetails;
