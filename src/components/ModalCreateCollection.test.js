import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ModalCreateCollection from "./ModalCreateCollection";

describe("ModalCreateCollection Components", () => {
  it("render ModalCreateCollection", () => {
    render(<ModalCreateCollection show={true} />);
    const arrayOfButtons = screen.getAllByRole("button");
    expect(arrayOfButtons[1].innerHTML).toBe("Create");

    const heading = screen.getByRole("heading");
    expect(heading.innerHTML).toBe("Create Collection");
  });

  it("render ModalCreateCollection type edit", () => {
    render(<ModalCreateCollection show={true} title="Cek" type="edit" />);
    const arrayOfButtons = screen.getAllByRole("button");
    expect(arrayOfButtons[1].innerHTML).toBe("Edit");

    const heading = screen.getByRole("heading");
    expect(heading.innerHTML).toBe("Edit Collection");
  });

  it("Submit Modal", () => {
    const { rerender } = render(
      <ModalCreateCollection show={true} onSubmit={() => {}} isValid={true} />
    );

    const modalCreateCollection = screen.getByTestId("modal-create-collection");
    const arrayOfButtons = screen.getAllByRole("button");
    userEvent.click(arrayOfButtons[1]);

    expect(arrayOfButtons.length).toBe(2);

    rerender(<ModalCreateCollection show={false} onSubmit={() => {}} />);
    expect(modalCreateCollection).not.toBeInTheDocument();
  });

  it("Close Modal", () => {
    const onClose = jest.fn();
    render(<ModalCreateCollection show={true} onClose={onClose} />);
    const arrayOfButtons = screen.getAllByRole("button");
    userEvent.click(arrayOfButtons[0]);
    expect(onClose).toHaveBeenCalled();
  });

  test("Input Value", () => {
    let onChangeInput = jest.fn();

    render(<ModalCreateCollection show={true} onChangeInput={onChangeInput} />);
    const input = screen.getByLabelText("collection-title-input");
    fireEvent.change(input, { target: { value: "23" } });

    expect(input).toBeInTheDocument();
    expect(input.value).toBe("23");
    expect(onChangeInput).toHaveBeenCalled();
  });
});
