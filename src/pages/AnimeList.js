import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { mq } from "../styles/Breakpoints";

import { useQuery } from "@apollo/client";
import { GET_ANIME_LIST } from "../graphql/Queries";

import Layout from "../layout/Layout";
import AnimeItem from "../components/AnimeItem";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import { Button } from "../components/Button";
import ModalAddToCollection from "../components/ModalAddToCollection";
import ModalCreateCollection from "../components/ModalCreateCollection";
import { theme } from "../styles/Theme";

const AnimeListContainer = styled.div(
  () => `
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 1rem;
  padding-top: 2rem;
  grid-gap: 2rem 1rem;
  ${mq("sm")} {
    grid-template-columns: repeat(3, 1fr);
  }
  
  ${mq("md")} {
    grid-template-columns: repeat(4, 1fr);
  }
  
  ${mq("lg")} {
    grid-template-columns: repeat(5, 1fr);
  }
`
);

const AnimeItemContainer = styled.div(
  () => `
    position: relative;

    .checkbox {
      position: absolute;
      top: 2.5%;
      left: 15%;
    }
  `
);

const SelectMultipleContainer = styled.div(
  () => `
    margin-top: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;

    button {
      padding: .5rem;

    }
  `
);

const AnimeList = () => {
  const [page, setPage] = useState(1);
  const [isMultipleSelect, setIsMultipleSelect] = useState(false);
  const [selectedAnimeList, setSelectedAnimeList] = useState({});
  const [arraySelected, setArraySelected] = useState([]);

  const [showModalAddCollection, setShowModalAddCollection] = useState(false);
  const [collectionsList, setCollectionsList] = useState([]);
  const [isValid, setValid] = useState(true);

  const [showModalCreateCollection, setShowModalCreateCollection] =
    useState(false);

  const { error, loading, data } = useQuery(GET_ANIME_LIST, {
    fetchPolicy: "network-only",
    variables: { page: page },
  });

  const pagination = (number) => {
    setPage(number);
  };

  const handleCheckAnime = (anime) => {
    let temp = { ...selectedAnimeList };
    const { id, title, coverImage, startDate } = anime;

    if (temp[id]) {
      delete temp[id];
    } else {
      temp[id] = { id, title, coverImage, startDate };
    }

    setSelectedAnimeList(temp);
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

  const getCollectionsList = () => {
    const collectionsLS = JSON.parse(localStorage.getItem("collections"));

    if (collectionsLS) {
      setCollectionsList(collectionsLS);
    }
  };

  const showModalAdd = () => {
    setShowModalAddCollection(true);
  };

  const closeModalAdd = () => {
    setShowModalAddCollection(false);
  };

  const submitModalAdd = (collectionsList) => {
    setCollectionsList(collectionsList);
    localStorage.setItem("collections", JSON.stringify(collectionsList));

    closeModalAdd();
    setIsMultipleSelect(false);
  };

  const showModalCreate = () => {
    closeModalAdd();
    setShowModalCreateCollection(true);
  };

  const closeModalCreate = () => {
    setShowModalCreateCollection(false);
    showModalAdd();
  };

  const submitModalCreate = (input) => {
    let newCollections = [...collectionsList];
    let newCollection = {
      title: input,
      anime_list: [],
    };

    if (collectionsList && collectionsList.length) {
      newCollection["id"] = collectionsList[collectionsList.length - 1].id + 1;
    } else {
      newCollection["id"] = 1;
    }

    newCollections.push(newCollection);

    localStorage.setItem("collections", JSON.stringify(newCollections));
    setCollectionsList(newCollections);

    closeModalCreate();
  };

  useEffect(() => {
    getCollectionsList();
  }, []);

  useEffect(() => {
    if (!isMultipleSelect) setSelectedAnimeList({});
  }, [isMultipleSelect]);

  useEffect(() => {
    let result = [];
    let keys = Object.keys(selectedAnimeList);

    keys.forEach((key) => {
      result.push(selectedAnimeList[key]);
    });

    setArraySelected(result);
  }, [selectedAnimeList]);

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  return (
    <Layout>
      <SelectMultipleContainer>
        <Button
          background={isMultipleSelect ? theme.colors.red : theme.colors.green}
          onClick={() => setIsMultipleSelect(!isMultipleSelect)}
        >
          {isMultipleSelect ? "Cancel" : "Select multiple"}
        </Button>
        {isMultipleSelect ? (
          <Button disabled={!arraySelected.length} onClick={showModalAdd}>
            Add to collections
          </Button>
        ) : (
          ""
        )}
      </SelectMultipleContainer>
      <AnimeListContainer>
        {data.Page.media.map(({ id, title, coverImage, startDate }, index) => (
          <AnimeItemContainer key={"anime-list-home-" + index}>
            <AnimeItem
              id={id}
              title={title}
              coverImage={coverImage}
              startDate={startDate}
              isMultipleSelect={isMultipleSelect}
              onMultipleSelect={() =>
                handleCheckAnime({ id, title, coverImage, startDate })
              }
              checked={selectedAnimeList[id]}
            />
          </AnimeItemContainer>
        ))}
      </AnimeListContainer>
      <Pagination
        currentPage={page}
        totalPage={data.Page.pageInfo.lastPage}
        setPage={pagination}
      />

      <ModalAddToCollection
        show={showModalAddCollection}
        collections={collectionsList}
        selectedCollectionsProps={{}}
        addedAnimeList={arraySelected}
        onClose={closeModalAdd}
        onSubmit={submitModalAdd}
        onAdd={showModalCreate}
      />

      <ModalCreateCollection
        show={showModalCreateCollection}
        title=""
        type="create"
        isValid={isValid}
        onChangeInput={onChangeInput}
        onClose={closeModalCreate}
        onSubmit={submitModalCreate}
      />
    </Layout>
  );
};

export default AnimeList;
