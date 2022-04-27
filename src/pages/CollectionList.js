import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CollectionItem from "../components/CollectionItem";
import ModalAddCollection from "../components/ModalAddCollection";
import ModalConfirmation from "../components/ModalConfirmation";
import { mq } from "../styles/Breakpoints";

const CollectionListContainer = styled.div(
  () => `
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 1rem;
  padding-top: 2rem;
  grid-gap: 2rem;

  ${mq("sm")} {
    grid-template-columns: repeat(3, 1fr);
  }
  
  ${mq("md")} {
    grid-template-columns: repeat(4, 1fr);
  }
`
);

const CollectionList = () => {
  const [collectionsList, setCollectionsList] = useState([]);

  // State for create/edit collection
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedCollection, setSelectedCollection] = useState({});

  // State for modal confirmation
  const [showConfirmation, setShowConfirmation] = useState(false);

  const getCollectionsList = () => {
    setCollectionsList([
      { id: 1, title: "A" },
      { id: 2, title: "B" },
      { id: 3, title: "C" },
      { id: 4, title: "D" },
    ]);
  };

  const onSubmitAddCollection = () => {};

  const showModalAdd = () => {
    setSelectedCollection({});
    setModalType("add");
    setShow(true);
  };

  const showModalEdit = (element) => {
    setSelectedCollection(element);
    setModalType("edit");
    setShow(true);
  };

  const showModalDelete = (element) => {
    setSelectedCollection(element);
    setShowConfirmation(true);
  };

  const closeModal = (type) => {
    if (type === "add") {
      setShow(false);
    } else {
      setShowConfirmation(false);
    }

    setSelectedCollection({});
    setModalType("");
  };

  useEffect(() => {
    getCollectionsList();
  }, []);

  let navigate = useNavigate();
  const toDetail = (id) => {
    navigate(`${id}`);
  };

  return (
    <CollectionListContainer>
      <CollectionItem type="empty" onAction={showModalAdd} />
      {collectionsList.map((element) => (
        <CollectionItem
          onAction={() => toDetail(element.id)}
          onEdit={() => showModalEdit(element)}
          onDelete={() => showModalDelete(element)}
          id={element.id}
          title={element.title}
          key={element.id}
          withAction={true}
        />
      ))}

      <ModalAddCollection
        show={show}
        title={selectedCollection?.title}
        type={modalType}
        onClose={() => closeModal("add")}
        onSubmit={onSubmitAddCollection}
      />

      <ModalConfirmation
        show={showConfirmation}
        title={selectedCollection?.title}
        onClose={() => closeModal("delete")}
        actionText="delete"
      />
    </CollectionListContainer>
  );
};

export default CollectionList;
