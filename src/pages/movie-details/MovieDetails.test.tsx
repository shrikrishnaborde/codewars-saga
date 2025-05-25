import { render, screen } from "@testing-library/react";
import MovieDetails from "./MovieDetails";
import type { Movie } from "../../movieTypes";

jest.mock("../../utils/renderStars", () => jest.fn(() => "⭐️⭐️⭐️"));
jest.mock("../../utils/toRoman", () => jest.fn(() => "IV"));

const sampleMovie: Movie = {
  title: "A New Hope",
  episode_id: "4",
  opening_crawl: "It is a period of civil war...",
  director: "George Lucas",
  release_date: "1977-05-25",
  poster: "https://example.com/poster.jpg",
  averageRating: 75,
  ratings: {
    imdbRating: 85,
    rtRating: 93,
    metaRating: 80,
  },
};

describe("MovieDetails Component", () => {
  it('renders "Select a movie" when no movie is passed', () => {
    render(<MovieDetails movie={null} />);
    expect(screen.getByText(/select a movie/i)).toBeInTheDocument();
  });

  it("renders movie details correctly when a movie is passed", () => {
    render(<MovieDetails movie={sampleMovie} />);

    expect(screen.getByText(/Episode IV - A New Hope/)).toBeInTheDocument();
    expect(screen.getByAltText("A New Hope")).toHaveAttribute(
      "src",
      sampleMovie.poster
    );
    expect(screen.getByText(sampleMovie.opening_crawl)).toBeInTheDocument();
    expect(screen.getByText(/Directed by: George Lucas/)).toBeInTheDocument();
    expect(
      screen.getByText(/Internet Movie Database: 85%/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Rotten Tomatoes: 93%/)).toBeInTheDocument();
    expect(screen.getByText(/Metacritic: 80%/)).toBeInTheDocument();
  });
});
