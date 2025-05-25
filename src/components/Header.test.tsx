import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  it("calls searchMovie with input text", () => {
    const mockSearch = jest.fn();

    render(<Header searchMovie={mockSearch} />);

    const input = screen.getByPlaceholderText(/type to search/i);
    fireEvent.change(input, { target: { value: "Luke" } });

    expect(mockSearch).toHaveBeenCalledWith("Luke");
  });

  it("renders search icon", () => {
    render(<Header searchMovie={() => {}} />);
    expect(screen.getByText("search")).toBeInTheDocument();
  });
});
