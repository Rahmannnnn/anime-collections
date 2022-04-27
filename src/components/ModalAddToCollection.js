import styled from "@emotion/styled";
import ModalGeneral from "../layout/ModalGeneral";
import { theme } from "../styles/Theme";
import { Heading } from "./Typography";

import { Button } from "../components/Button";
import { useEffect, useState } from "react";

const ModalAddToCollectionContainer = styled.div(
  () => `
    
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem;

  .content {
    margin: 1rem 0 3rem 0;

    h1 {
      color: ${theme.colors.white};
      margin-bottom: 1rem;
      text-align: center;
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

const ModalAddToCollection = (props) => {
  const { show, collections, selectedCollectionsProps } = props;

  const [selectedCollection, setSelectedCollection] = useState([]);

  const onClose = () => {
    props.onClose();
  };

  const onSubmit = () => {
    props.onSubmit(selectedCollection);
  };

  const onAdd = () => {
    props.onAdd();
  };

  useEffect(() => {
    if (selectedCollectionsProps?.length && show)
      setSelectedCollection([...selectedCollectionsProps]);
  }, [show, selectedCollectionsProps]);

  useEffect(() => {
    if (!show) setSelectedCollection([]);
  }, [show]);

  return (
    <ModalGeneral show={show} onClose={onClose}>
      <ModalAddToCollectionContainer>
        <div className="content">
          <Heading>Add To Collections</Heading>
        </div>
        <div className="action">
          <Button onClick={onClose} background={theme.colors.red}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>Submit</Button>
        </div>
      </ModalAddToCollectionContainer>
    </ModalGeneral>
  );
};

export default ModalAddToCollection;
