import styled from "@emotion/styled";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import CollectionItem from "../components/CollectionItem";
import ModalCreateCollection from "../components/ModalCreateCollection";
import ModalConfirmation from "../components/ModalConfirmation";
import Layout from "../layout/Layout";

import { mq } from "../styles/Breakpoints";
import { indexArrayOfObject } from "../utils/Array";
import { theme } from "../styles/Theme";

const CollectionListContainer = styled.div(
  () => `
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  margin: 1rem;
  padding-top: 2rem;
  grid-gap: 2rem;

  ${mq("sm")} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${mq("md")} {
    grid-template-columns: repeat(3, 1fr);
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
    const collectionsLS = JSON.parse(localStorage.getItem("collections"));

    if (collectionsLS) {
      setCollectionsList(collectionsLS);
    }
  };

  const onSubmitCreateCollection = (input) => {
    let newCollections = [...collectionsList];
    let newCollection = {};

    if (modalType === "edit") {
      newCollection = { ...selectedCollection, title: input };
      let index = indexArrayOfObject(collectionsList, "id", newCollection.id);
      newCollections[index] = newCollection;
    } else {
      newCollection = {
        title: input,
        anime_list: [],
      };

      if (collectionsList && collectionsList.length) {
        newCollection["id"] =
          collectionsList[collectionsList.length - 1].id + 1;
      } else {
        newCollection["id"] = 1;
      }
      newCollections.push(newCollection);
    }

    // Add to localStorage
    localStorage.setItem("collections", JSON.stringify(newCollections));
    setCollectionsList(newCollections);
    closeModal("create");
  };

  const onSubmitDeleteCollection = () => {
    let index = indexArrayOfObject(
      collectionsList,
      "id",
      selectedCollection.id
    );
    if (index !== -1) {
      let newCollections = [...collectionsList];
      newCollections.splice(index, 1);

      // Add to localStorage
      setCollectionsList(newCollections);
      localStorage.setItem("collections", JSON.stringify(newCollections));
    }
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
    if (input) {
      const index = collectionsList.findIndex(
        (element) => element.title === input
      );

      if (index !== -1) {
        setValid(false);
      } else {
        setValid(true);
      }
    } else {
      setValid(false);
    }
  };

  useEffect(() => {
    getCollectionsList();
  }, []);

  let navigate = useNavigate();
  const toDetail = (id) => {
    navigate(`${id}`);
  };

  return (
    <Layout>
      <CollectionListContainer>
        <CollectionItem type="empty" onAction={showModalCreate} />
        {collectionsList.map((element) => (
          <Link
            style={{
              textDecoration: "none",
              color: theme.colors.darkBlue,
            }}
            to={`../collections/${element.id}`}
            key={"collection-item-collection-list-" + element.id}
          >
            <CollectionItem
              id={element.id}
              title={element.title}
              withAction={true}
              image={
                element.anime_list.length
                  ? element.anime_list[0].coverImage.large
                  : ""
              }
              onAction={() => toDetail(element.id)}
              onEdit={() => showModalEdit(element)}
              onDelete={() => showModalDelete(element)}
            />
          </Link>
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
    </Layout>
  );
};

export default CollectionList;
