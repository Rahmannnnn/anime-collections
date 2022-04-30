import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ModalConfirmation from "./ModalConfirmation";

describe("ModalConfirmation Components", () => {
  it("render ModalConfirmation", () => {
    render(<ModalConfirmation show={true} />);
    expect(screen.getByTestId("modal-confirmation")).toBeInTheDocument();
  });

  it("render ModalConfirmation with title", () => {
    render(<ModalConfirmation show={true} title="Modal Title" />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("heading").innerHTML).toContain("Modal Title");
  });

  it("render ModalConfirmation with action text", () => {
    render(<ModalConfirmation show={true} actionText="delete" />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("heading").innerHTML).toContain("delete");
  });

  it("Get Button Cancel and Submit", () => {
    render(<ModalConfirmation show={true} />);

    const arrayOfButtons = screen.getAllByRole("button");
    expect(arrayOfButtons.length).toBe(2);
  });

  it("Close Modal", () => {
    const { rerender } = render(
      <ModalConfirmation show={true} onClose={() => {}} />
    );

    const modalConfirmation = screen.getByTestId("modal-confirmation");
    const arrayOfButtons = screen.getAllByRole("button");
    userEvent.click(arrayOfButtons[0]);

    rerender(<ModalConfirmation show={false} onClose={() => {}} />);
    expect(modalConfirmation).not.toBeInTheDocument();
  });

  it("Submit Modal", () => {
    const { rerender } = render(
      <ModalConfirmation show={true} onSubmit={() => {}} />
    );

    const modalConfirmation = screen.getByTestId("modal-confirmation");
    const arrayOfButtons = screen.getAllByRole("button");
    userEvent.click(arrayOfButtons[1]);

    rerender(<ModalConfirmation show={false} onSubmit={() => {}} />);
    expect(modalConfirmation).not.toBeInTheDocument();
  });
});
