import styled from "@emotion/styled";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CollectionItem from "../components/CollectionItem";
import ModalCreateCollection from "../components/ModalCreateCollection";
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
  const [isValid, setValid] = useState(true);
  const [modalType, setModalType] = useState("");
  const [selectedCollection, setSelectedCollection] = useState({});

  // State for modal confirmation
  const [showConfirmation, setShowConfirmation] = useState(false);

  const getCollectionsList = () => {
    setCollectionsList([
      {
        id: 1,
        title: "A",
        image:
          "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-tXMN3Y20PIL9.jpg",
      },
      {
        id: 2,
        title: "B",
        image:
          "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-tXMN3Y20PIL9.jpg",
      },
      {
        id: 3,
        title: "C",
        image:
          "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-tXMN3Y20PIL9.jpg",
      },
      {
        id: 4,
        title: "D",
        image:
          "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-tXMN3Y20PIL9.jpg",
      },
    ]);
  };

  const onSubmitCreateCollection = () => {
    if (modalType === "edit") {
      console.log("edit");
    } else {
      console.log("create");
    }

    closeModal("create");
  };

  const onSubmitDeleteCollection = () => {
    console.log("deleted");
    closeModal("delete");
  };

  const showModalCreate = () => {
    setSelectedCollection({});
    setModalType("create");
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
    if (type === "create") {
      setShow(false);
    } else {
      setShowConfirmation(false);
    }

    setSelectedCollection({});
    setModalType("");
  };

  const onChangeInput = (input) => {
    console.log(input);
  };

  useEffect(() => {
    getCollectionsList();
    setValid(true);
  }, []);

  let navigate = useNavigate();
  const toDetail = (id) => {
    navigate(`${id}`);
  };

  return (
    <CollectionListContainer>
      <CollectionItem type="empty" onAction={showModalCreate} />
      {collectionsList.map((element) => (
        <CollectionItem
          id={element.id}
          title={element.title}
          key={element.id}
          withAction={true}
          image={element.image}
          onAction={() => toDetail(element.id)}
          onEdit={() => showModalEdit(element)}
          onDelete={() => showModalDelete(element)}
        />
      ))}

      <ModalCreateCollection
        show={show}
        title={selectedCollection?.title}
        type={modalType}
        isValid={isValid}
        onChangeInput={onChangeInput}
        onClose={() => closeModal("create")}
        onSubmit={onSubmitCreateCollection}
      />

      <ModalConfirmation
        show={showConfirmation}
        title={selectedCollection?.title}
        onClose={() => closeModal("delete")}
        onSubmit={onSubmitDeleteCollection}
        actionText="delete"
      />
    </CollectionListContainer>
  );
};

export default CollectionList;
