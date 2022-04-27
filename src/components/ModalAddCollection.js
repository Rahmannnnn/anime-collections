import ModalGeneral from "../layout/ModalGeneral";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import { theme } from "../styles/Theme";
import styled from "@emotion/styled";
import { Heading } from "./Typography";

const ModalAddCollectionContainer = styled.div(
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
const ModalAddCollection = (props) => {
  const { show, type, title } = props;
  const [input, setInput] = useState("");

  const onClose = () => {
    props.onClose();
  };

  const onSubmit = () => {
    props.onSubmit();
  };

  useEffect(() => {
    if (title && type === "edit") setInput(title);
  }, [title, type]);

  return (
    <ModalGeneral show={show} onClose={onClose}>
      <ModalAddCollectionContainer>
        <div className="content">
          <Heading>{type === "edit" ? "Edit" : "Create"} Collection</Heading>
          <input
            type="text"
            value={input}
            onInput={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="action">
          <Button onClick={onClose} background={theme.colors.red}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>
            {type === "edit" ? "Edit" : "Create"}
          </Button>
        </div>
      </ModalAddCollectionContainer>
    </ModalGeneral>
  );
};

export default ModalAddCollection;
