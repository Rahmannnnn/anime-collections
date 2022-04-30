import { render, screen } from "@testing-library/react";
import React from "react";
import CollectionItem from "./CollectionItem";

describe("CollectionItem Components", () => {
  it("render CollectionItem", () => {
    render(<CollectionItem title={"title"} />);
    expect(screen.getByTestId("collection-item")).toBeInTheDocument();
  });

  it("render CollectionItem Empty", () => {
    render(<CollectionItem type="empty" />);
    expect(screen.getByTestId("collection-item-empty")).toBeInTheDocument();
  });

  it("CollectionItem with image", () => {
    render(<CollectionItem image={"image"} title={"title"} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("CollectionItem with title length > 20", () => {
    render(
      <CollectionItem title={"title title title title title title title"} />
    );
    expect(screen.getByRole("heading").innerHTML).toContain(
      "title title title ti..."
    );
  });

  it("CollectionItem with title length = 0", () => {
    render(<CollectionItem title={""} />);
    expect(screen.getByRole("heading").innerHTML).toContain("");
  });

  it("CollectionItem with action button", () => {
    render(<CollectionItem withAction={true} title={""} />);
    expect(screen.getByTestId("edit-button")).toBeInTheDocument();
    expect(screen.getByTestId("delete-button")).toBeInTheDocument();
  });
});
