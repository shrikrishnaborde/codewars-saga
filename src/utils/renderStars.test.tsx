import { render, screen } from "@testing-library/react";
import renderStars from "./renderStars";

describe("renderStars", () => {
  it("renders 7 full stars, 1 half star, 2 empty stars for rating 75", () => {
    render(<>{renderStars(75)}</>);

    expect(screen.getAllByText("star")).toHaveLength(7);
    expect(screen.getAllByText("star_half")).toHaveLength(1);
    expect(screen.getAllByText("star_border")).toHaveLength(2);
  });

  it("renders 10 full stars for rating 100", () => {
    render(<>{renderStars(100)}</>);
    expect(screen.getAllByText("star")).toHaveLength(10);
    expect(screen.queryByText("star_half")).not.toBeInTheDocument();
    expect(screen.queryByText("star_border")).not.toBeInTheDocument();
  });

  it("renders 5 full stars, 1 half star, 4 empty stars for rating 55", () => {
    render(<>{renderStars(55)}</>);
    expect(screen.getAllByText("star")).toHaveLength(5);
    expect(screen.getAllByText("star_half")).toHaveLength(1);
    expect(screen.getAllByText("star_border")).toHaveLength(4);
  });

  it("renders 0 full stars, 1 half star, 9 empty stars for rating 5", () => {
    render(<>{renderStars(5)}</>);
    expect(screen.queryAllByText("star")).toHaveLength(0);
    expect(screen.getAllByText("star_half")).toHaveLength(1);
    expect(screen.getAllByText("star_border")).toHaveLength(9);
  });
});
