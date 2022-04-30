import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading Component", () => {
  it("render Loading component", () => {
    render(<Loading />);
    expect(screen.getByTestId("loading")).toBeTruthy();
  });
});
