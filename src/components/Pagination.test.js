import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  it("render Pagination component", () => {
    render(<Pagination />);
    expect(screen.getByTestId("pagination")).toBeTruthy();
  });

  it("render Pagination correctly", () => {
    render(<Pagination currentPage={1} totalPage={6} />);

    for (let i = 1; i <= 6; i++) {
      const number = screen.getByText(i);
      expect(number).toBeInTheDocument();
    }
  });

  it("render Pagination correctly (first button is not page 1)", () => {
    render(<Pagination currentPage={6} totalPage={10} />);

    for (let i = 2; i <= 7; i++) {
      const number = screen.getByText(i);
      expect(number).toBeInTheDocument();
    }
  });

  it("Total button pagination rendered correctly (without previous button)", () => {
    render(<Pagination currentPage={1} totalPage={6} />);

    const arrayOfButtons = screen.getAllByRole("button");
    expect(arrayOfButtons.length).toBe(7);
  });

  it("Total button pagination rendered correctly", () => {
    render(<Pagination currentPage={2} totalPage={6} />);

    const arrayOfButtons = screen.getAllByRole("button");
    expect(arrayOfButtons.length).toBe(8);
  });

  it("Total button pagination rendered correctly (without next button)", () => {
    render(<Pagination currentPage={6} totalPage={6} />);

    const arrayOfButtons = screen.getAllByRole("button");
    expect(arrayOfButtons.length).toBe(7);
  });

  it("Total button pagination rendered correctly (without prev and next button)", () => {
    render(<Pagination currentPage={1} totalPage={1} />);

    const arrayOfButtons = screen.getAllByRole("button");
    expect(arrayOfButtons.length).toBe(1);
  });

  it("Click Prev Button", () => {
    const setPage = () => {};

    const { rerender } = render(
      <Pagination currentPage={2} totalPage={6} setPage={setPage} />
    );
    const button = screen.getByTestId("pagination-button-previous");
    userEvent.click(button);

    rerender(<Pagination currentPage={1} totalPage={6} setPage={setPage} />);

    const arrayOfButtons = screen.getAllByRole("button");
    expect(arrayOfButtons.length).toBe(7);
  });

  it("Click next Button", () => {
    const setPage = () => {};

    const { rerender } = render(
      <Pagination currentPage={5} totalPage={6} setPage={setPage} />
    );
    const button = screen.getByText(">");
    userEvent.click(button);

    rerender(<Pagination currentPage={6} totalPage={6} setPage={setPage} />);

    const arrayOfButtons = screen.getAllByRole("button");
    expect(arrayOfButtons.length).toBe(7);
  });

  it("Click page button change pagination number (not start from 1)", () => {
    const setPage = () => {};

    const { rerender } = render(
      <Pagination currentPage={5} totalPage={12} setPage={setPage} />
    );

    const button = screen.getByText("6");
    userEvent.click(button);

    rerender(<Pagination currentPage={6} totalPage={12} setPage={setPage} />);

    for (let i = 2; i <= 7; i++) {
      const number = screen.getByText(i);
      expect(number).toBeInTheDocument();
    }
  });

  it("render previous (<) button if the currentPage > 1", () => {
    render(<Pagination currentPage={2} totalPage={10} />);
    expect(screen.getByText("<")).toBeInTheDocument();
  });

  it("render next (>) button if the currentPage < totalPage", () => {
    render(<Pagination currentPage={2} totalPage={10} />);
    expect(screen.getByText(">")).toBeInTheDocument();
  });
});
