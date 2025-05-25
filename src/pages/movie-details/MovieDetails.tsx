import type { Movie } from "../../movieTypes";
import renderStars from "../../utils/renderStars";
import toRoman from "../../utils/toRoman";

type MovieDetailsProps = {
  movie: Movie | null;
};

function MovieDetails({ movie }: MovieDetailsProps) {
  if (!movie) return <div className="movie-details">Select a movie</div>;

  return (
    <div className="movie-details">
      <div className="movie-title">
        Episode {toRoman(+movie.episode_id)} - {movie.title}
      </div>
      <div className="movie-info">
        <img className="movie-poster" src={movie.poster} alt={movie.title} />
        <div>{movie.opening_crawl}</div>
      </div>

      <div className="director-info">Directed by: {movie.director}</div>
      <div className="average-rating">
        Average Rating : {renderStars(movie?.averageRating ?? 0)}
      </div>
      <div className="ratings">
        <div className="chip">
          Internet Movie Database: {movie.ratings?.imdbRating}%
        </div>
        <div className="chip">Rotten Tomatoes: {movie.ratings?.rtRating}%</div>
        <div className="chip">Metacritic: {movie.ratings?.metaRating}%</div>
      </div>
    </div>
  );
}

export default MovieDetails;
