import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ModalAddToCollection, {
  CollectionItemCheckbox,
} from "./ModalAddToCollection";

describe("ModalAddToCollection Components", () => {
  it("render ModalAddToCollection", () => {
    render(<ModalAddToCollection show={true} />);
    expect(screen.getByTestId("modal-add-to-collection")).toBeInTheDocument();
  });

  it("count button", () => {
    render(<ModalAddToCollection show={true} onClose={() => {}} />);

    const arrayOfButtons = screen.getAllByRole("button");
    expect(arrayOfButtons.length).toBe(3);
  });

  it("click add button", () => {
    const { rerender } = render(
      <ModalAddToCollection show={true} onAdd={() => {}} />
    );

    const modalAddToCollection = screen.getByTestId("modal-add-to-collection");
    const arrayOfButtons = screen.getAllByRole("button");
    userEvent.click(arrayOfButtons[0]);

    rerender(<ModalAddToCollection show={false} onAdd={() => {}} />);
    expect(modalAddToCollection).not.toBeInTheDocument();
  });

  it("close modal", () => {
    const onClose = jest.fn();
    render(<ModalAddToCollection show={true} onClose={onClose} />);
    const arrayOfButtons = screen.getAllByRole("button");
    userEvent.click(arrayOfButtons[1]);
    expect(onClose).toHaveBeenCalled();
  });

  it("submit modal", () => {
    const { rerender } = render(
      <ModalAddToCollection show={true} onSubmit={() => {}} collections={[]} />
    );

    const modalAddToCollection = screen.getByTestId("modal-add-to-collection");
    const arrayOfButtons = screen.getAllByRole("button");
    userEvent.click(arrayOfButtons[2]);

    rerender(
      <ModalAddToCollection show={false} onSubmit={() => {}} collections={[]} />
    );
    expect(modalAddToCollection).not.toBeInTheDocument();
  });

  it("submit modal with addedAnimeList is not empty", () => {
    let collection = {
      id: 1,
      title: "",
      anime_list: [],
    };

    let addedAnime = {
      id: 1,
      title: {},
      coverImage: {},
      startDate: {},
    };

    const { rerender } = render(
      <ModalAddToCollection
        show={true}
        onSubmit={() => {}}
        collections={[collection]}
        addedAnimeList={[addedAnime]}
      />
    );

    const modalAddToCollection = screen.getByTestId("modal-add-to-collection");
    const arrayOfButtons = screen.getAllByRole("button");
    userEvent.click(arrayOfButtons[2]);

    rerender(
      <ModalAddToCollection
        show={false}
        collections={[collection]}
        addedAnimeList={[addedAnime]}
      />
    );
    expect(modalAddToCollection).not.toBeInTheDocument();
  });

  it("submit modal with addedAnimeList & selectedCollections is not empty", () => {
    let collection = {
      id: 1,
      title: "",
      anime_list: [],
    };

    let selectedCollections = {
      1: true,
    };

    let addedAnime = {
      id: 1,
      title: {},
      coverImage: {},
      startDate: {},
    };

    const { rerender } = render(
      <ModalAddToCollection
        show={true}
        onSubmit={() => {}}
        collections={[collection]}
        addedAnimeList={[addedAnime]}
        selectedCollectionsProps={selectedCollections}
      />
    );

    const modalAddToCollection = screen.getByTestId("modal-add-to-collection");
    const arrayOfButtons = screen.getAllByRole("button");
    userEvent.click(arrayOfButtons[2]);

    rerender(
      <ModalAddToCollection
        show={false}
        collections={[collection]}
        addedAnimeList={[addedAnime]}
        selectedCollectionsProps={selectedCollections}
      />
    );
    expect(modalAddToCollection).not.toBeInTheDocument();
  });

  it("render collections item checkbox", () => {
    render(<CollectionItemCheckbox onCheck={() => {}} />);
    expect(screen.getByTestId("collection-item-checkbox")).toBeInTheDocument();
  });

  it("click check collections item checkbox", () => {
    const setCheck = jest.fn();

    render(<CollectionItemCheckbox setCheck={setCheck} checked={false} />);

    userEvent.click(screen.getByTestId("collection-item-checkbox"));
    expect(setCheck).toHaveBeenCalled();
  });
});
