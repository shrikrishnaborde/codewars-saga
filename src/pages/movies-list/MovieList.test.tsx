import { render, screen, fireEvent } from "@testing-library/react";
import MoviesList from "./MoviesList";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../slices/moviesListSlice";

function getRenderedTitles() {
  return screen
    .getAllByText(/Episode [IVXLCDM]+ - /i)
    .map((el) => el.textContent?.replace(/Episode [IVXLCDM]+ - /i, "").trim());
}

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../slices/moviesListSlice", () => ({
  fetchMovies: jest.fn(() => ({ type: "FETCH_MOVIES" })),
}));

const sampleMovies = [
  {
    title: "A New Hope",
    episode_id: 4,
    release_date: "1977-05-25",
    opening_crawl: "...",
    director: "George Lucas",
    poster: "poster1.jpg",
    averageRating: 80,
    ratings: { imdbRating: 90, rtRating: 95, metaRating: 85 },
  },
  {
    title: "The Empire Strikes Back",
    episode_id: 5,
    release_date: "1980-05-21",
    opening_crawl: "...",
    director: "Irvin Kershner",
    poster: "poster2.jpg",
    averageRating: 90,
    ratings: { imdbRating: 92, rtRating: 97, metaRating: 88 },
  },
  {
    title: "Return of the Jedi",
    episode_id: 6,
    release_date: "1983-05-25",
    opening_crawl: "...",
    director: "Richard Marquand",
    poster: "poster3.jpg",
    averageRating: 70,
    ratings: { imdbRating: 88, rtRating: 90, metaRating: 80 },
  },
];

describe("MoviesList Component", () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
    (useSelector as unknown as jest.Mock).mockImplementation((callback) =>
      callback({
        movies: {
          movies: sampleMovies,
          loading: false,
          error: null,
        },
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should dispatch fetchMovies on mount", () => {
    render(<MoviesList />);
    expect(dispatchMock).toHaveBeenCalledWith(fetchMovies());
  });

  it("should render movie titles and allow selecting a movie", () => {
    render(<MoviesList />);
    expect(screen.getByText(/A New Hope/)).toBeInTheDocument();
    expect(screen.getByText(/The Empire Strikes Back/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/A New Hope/));
    expect(screen.getByText(/Directed by: George Lucas/)).toBeInTheDocument();
  });

  it("should sort when header is clicked", () => {
    render(<MoviesList />);
    const titleHeader = screen.getByText("Title");
    fireEvent.click(titleHeader);

    // Check if sort icon changed or sort order updated
    expect(titleHeader.querySelector(".material-icons")?.textContent).toBe(
      "arrow_downward"
    );
  });

  it("sorts by title ascending and descending", () => {
    render(<MoviesList />);
    const titleHeader = screen.getByText("Title");
    fireEvent.click(titleHeader); // desc
    expect(getRenderedTitles()).toEqual([
      "The Empire Strikes Back",
      "Return of the Jedi",
      "A New Hope",
    ]);

    fireEvent.click(titleHeader); // asc
    expect(getRenderedTitles()).toEqual([
      "A New Hope",
      "Return of the Jedi",
      "The Empire Strikes Back",
    ]);
  });

  it("sorts by episode_id ascending and descending", () => {
    render(<MoviesList />);
    const episodeHeader = screen.getByText(/Episode #/);
    fireEvent.click(episodeHeader); // asc
    expect(getRenderedTitles()).toEqual([
      "A New Hope",
      "The Empire Strikes Back",
      "Return of the Jedi",
    ]);

    fireEvent.click(episodeHeader); // desc
    expect(getRenderedTitles()).toEqual([
      "Return of the Jedi",
      "The Empire Strikes Back",
      "A New Hope",
    ]);
  });

  it("sorts by averageRating ascending and descending", () => {
    render(<MoviesList />);
    const ratingHeader = screen.getByText("Rating");
    fireEvent.click(ratingHeader); // asc
    expect(getRenderedTitles()).toEqual([
      "Return of the Jedi",
      "A New Hope",
      "The Empire Strikes Back",
    ]);

    fireEvent.click(ratingHeader); // desc
    expect(getRenderedTitles()).toEqual([
      "The Empire Strikes Back",
      "A New Hope",
      "Return of the Jedi",
    ]);
  });

  it("sorts by release_date ascending and descending", () => {
    render(<MoviesList />);
    const releaseHeader = screen.getByText("Release Year");
    fireEvent.click(releaseHeader); // asc
    expect(getRenderedTitles()).toEqual([
      "A New Hope",
      "The Empire Strikes Back",
      "Return of the Jedi",
    ]);

    fireEvent.click(releaseHeader); // desc
    expect(getRenderedTitles()).toEqual([
      "Return of the Jedi",
      "The Empire Strikes Back",
      "A New Hope",
    ]);
  });

  it("displays movie details when a movie is clicked", () => {
    render(<MoviesList />);

    // Click the second movie
    const movieTitle = screen.getByText(/The Empire Strikes Back/);
    fireEvent.click(movieTitle);

    // Expect director and description to appear in MovieDetails
    expect(screen.getByText(/Directed by: Irvin Kershner/)).toBeInTheDocument();
  });

  it("filters movie list when user types into search input", () => {
    render(<MoviesList />);

    const input = screen.getByPlaceholderText(/type to search/i);

    // Check all 3 movies are initially shown
    expect(screen.getByText(/A New Hope/)).toBeInTheDocument();
    expect(screen.getByText(/The Empire Strikes Back/)).toBeInTheDocument();
    expect(screen.getByText(/Return of the Jedi/)).toBeInTheDocument();

    // Type into the search input
    fireEvent.change(input, { target: { value: "Empire" } });

    // Now only "The Empire Strikes Back" should be shown
    expect(screen.getByText(/The Empire Strikes Back/)).toBeInTheDocument();
    expect(screen.queryByText(/A New Hope/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Return of the Jedi/)).not.toBeInTheDocument();
  });
});
