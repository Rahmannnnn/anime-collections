import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ModalGeneral from "./ModalGeneral";

describe("ModalGeneral Component", () => {
  it("render Modal General component", () => {
    render(<ModalGeneral show={true} />);
    expect(screen.getByTestId("modal-general")).toBeInTheDocument();
  });

  it("Click onClose", () => {
    const { rerender } = render(
      <ModalGeneral show={true} onClose={() => {}} />
    );

    let overlay = screen.getByTestId("modal-general-overlay");
    userEvent.click(overlay);

    rerender(<ModalGeneral show={false} onClose={() => {}} />);
    expect(overlay).not.toBeInTheDocument();
  });
});
