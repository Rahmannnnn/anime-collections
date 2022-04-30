import ModalGeneral from "../layout/ModalGeneral";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { theme } from "../styles/Theme";
import styled from "@emotion/styled";
import { Heading } from "./Typography";

const ModalCreateCollectionContainer = styled.div(
  () => `
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem;

    .content {
      margin: 3rem 0;

      h1 {
        color: ${theme.colors.white};
        margin-bottom: 1rem;
        text-align: center;
      }

      input {
        border: 1px solid ${theme.colors.lightGray};
        outline: none;
        padding: .5rem;
        width: -webkit-fill-available;
        background: transparent;
        color: white;
        border-radius: .5rem;
        font-family: ${theme.fontFamily.openSans};
        font-size: 1rem;

        :focus {
          border-color: ${theme.colors.white};
        }

        &.error {
          border: 1px solid ${theme.colors.red};
        }
      }
      
    }

    .action {
      width: 100%;
      display: flex;
      gap: 1rem;
      justify-content: space-between;

      button {
        width: 100%;
        max-width: 200px;
      }
    }
  `
);
const ModalCreateCollection = (props) => {
  const { show, type, title, isValid } = props;
  const [input, setInput] = useState("");

  const onClose = () => {
    props.onClose();
  };

  const onSubmit = () => {
    props.onSubmit(input);
  };

  const onChangeInput = (input) => {
    props.onChangeInput(input);
    setInput(input);
  };

  useEffect(() => {
    if (title && type === "edit" && show) setInput(title);
  }, [title, type, show]);

  useEffect(() => {
    if (!show) setInput("");
  }, [show]);

  return (
    <ModalGeneral show={show} onClose={onClose}>
      <ModalCreateCollectionContainer data-testid="modal-create-collection">
        <div className="content">
          <Heading>{type === "edit" ? "Edit" : "Create"} Collection</Heading>
          <input
            aria-label="collection-title-input"
            type="text"
            className={isValid ? "" : "error"}
            value={input}
            onChange={(e) => onChangeInput(e.target.value)}
          />
        </div>
        <div className="action">
          <Button onClick={onClose} background={theme.colors.red}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={!isValid}>
            {type === "edit" ? "Edit" : "Create"}
          </Button>
        </div>
      </ModalCreateCollectionContainer>
    </ModalGeneral>
  );
};

export default ModalCreateCollection;
