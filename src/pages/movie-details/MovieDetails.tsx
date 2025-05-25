import type { Movie } from "../../movieTypes";
import renderStars from "../../utils/renderStars";
import toRoman from "../../utils/toRoman";

/**
 * Props for the MovieDetails component.
 * @typedef {Object} MovieDetailsProps
 * @property {Movie | null} movie - The currently selected movie or null.
 */
type MovieDetailsProps = {
  movie: Movie | null;
};

/**
 * MovieDetails Component
 *
 * Displays detailed information about the selected movie including
 * episode title, director, poster image, opening crawl, and ratings.
 *
 * @param {MovieDetailsProps} props - Component props
 * @returns {JSX.Element} Rendered movie details or a fallback message
 */
function MovieDetails({ movie }: MovieDetailsProps) {
  // If no movie is selected, prompt user to select one
  if (!movie) return <div className="movie-details">Select a movie</div>;

  return (
    <div className="movie-details">
      {/* Movie Title */}
      <div className="movie-title">
        Episode {toRoman(+movie.episode_id)} - {movie.title}
      </div>

      {/* Movie Poster and Opening Crawl */}
      <div className="movie-info">
        <img className="movie-poster" src={movie.poster} alt={movie.title} />
        <div>{movie.opening_crawl}</div>
      </div>

      {/* Director */}
      <div className="director-info">Directed by: {movie.director}</div>

      {/* Average Rating rendered as stars */}
      <div className="average-rating">
        Average Rating : {renderStars(movie?.averageRating ?? 0)}
      </div>

      {/* Ratings from external sources */}
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
