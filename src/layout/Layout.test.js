import { render, screen } from "@testing-library/react";
import React from "react";
import Layout from "./Layout";

describe("Layout Component", () => {
  it("render Layout component", () => {
    render(<Layout />);
    expect(screen.getByTestId("layout")).toBeInTheDocument();
  });
});
