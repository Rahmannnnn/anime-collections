import { useEffect, useState } from "react";
import { Heading, Paragraph } from "../components/Typography";
import { MdModeEdit } from "react-icons/md";
import AnimeItem from "../components/AnimeItem";
import styled from "@emotion/styled";
import { mq } from "../styles/Breakpoints";
import { Button } from "../components/Button";
import { theme } from "../styles/Theme";
import Layout from "../layout/Layout";
import ModalCreateCollection from "../components/ModalCreateCollection";
import ModalConfirmation from "../components/ModalConfirmation";
import { indexArrayOfObject } from "../utils/Array";
import { Link, useParams } from "react-router-dom";

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

  .anime_item {
    display: flex;
    flex-direction: column;
    gap: .5rem;

    button {
      width: 75%;
      margin: 0 auto;
      padding: .5rem;
    }
  }
`
);

const CollectionDetailTitle = styled.div(
  () => `
    min-height: 20vh;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 2rem;
    color: ${theme.colors.lightGray};

    h1 {
      font-size: 40px;
      text-decoration: underline;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .icon {
      font-size: 32px;
      cursor: pointer;
    }
  `
);

const CollectionDetail = () => {
  let params = useParams();

  const [collectionsList, setCollectionsList] = useState([]);
  const [currentCollection, setCurrentCollection] = useState({});

  const [showModalEdit, setModalEdit] = useState(false);
  const [isValid, setValid] = useState(true);

  const [showModalDelete, setModalDelete] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState({});

  const getCollectionDetail = () => {
    const collectionsLS = JSON.parse(localStorage.getItem("collections"));

    if (collectionsLS) {
      setCollectionsList([...collectionsLS]);
    }
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

  const onSubmitEditCollection = (input) => {
    let newCollections = [...collectionsList];
    let newCollection = { ...currentCollection, title: input };

    let index = indexArrayOfObject(collectionsList, "id", newCollection.id);
    newCollections[index] = newCollection;

    localStorage.setItem("collections", JSON.stringify(newCollections));
    setCollectionsList(newCollections);
    setModalEdit(false);
  };

  const showModalConfirmation = (item) => {
    const { id, title } = item;

    if (id) {
      setSelectedAnime({ id, title });
      setModalDelete(true);
    }
  };

  const closeModalConfirmation = () => {
    setSelectedAnime({});
    setModalDelete(false);
  };

  const onSubmitDeleteAnime = () => {
    let newCollections = [...collectionsList];
    let newCollection = { ...currentCollection };
    let newAnimeList = [...newCollection.anime_list];

    let index = indexArrayOfObject(newAnimeList, "id", selectedAnime.id);

    if (index !== -1) {
      newAnimeList.splice(index, 1);
      newCollection = { ...currentCollection, anime_list: [...newAnimeList] };

      let indexCollection = indexArrayOfObject(
        newCollections,
        "id",
        newCollection.id
      );

      if (indexCollection !== -1) {
        newCollections[indexCollection] = newCollection;
        localStorage.setItem("collections", JSON.stringify(newCollections));
        setCollectionsList(newCollections);
      }
    }

    closeModalConfirmation();
  };

  useEffect(() => {
    if (collectionsList) {
      let index = indexArrayOfObject(
        collectionsList,
        "id",
        parseInt(params.collectionId)
      );

      if (index !== -1) {
        setCurrentCollection(collectionsList[index]);
      }
    }
  }, [collectionsList, params.collectionId]);

  useEffect(() => {
    getCollectionDetail();
  }, []);

  return (
    <Layout>
      <CollectionDetailTitle>
        <Heading>{currentCollection?.title || ""}</Heading>
        <MdModeEdit className="icon" onClick={() => setModalEdit(true)} />
      </CollectionDetailTitle>

      {currentCollection?.anime_list?.length ? (
        <AnimeListContainer>
          {currentCollection?.anime_list?.map(
            ({ id, title, coverImage, startDate }, index) => (
              <div
                key={"anime-list-collection-detail-" + index}
                className="anime_item"
              >
                <AnimeItem
                  id={id}
                  title={title}
                  coverImage={coverImage}
                  startDate={startDate}
                />

                <Button
                  background={theme.colors.red}
                  onClick={() => showModalConfirmation({ id, title })}
                >
                  Delete
                </Button>
              </div>
            )
          )}
        </AnimeListContainer>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paragraph color={theme.colors.lightGray}>
            Oops, your collection is empty
          </Paragraph>
          <Link
            style={{
              textDecoration: "none",
              color: theme.colors.darkBlue,
            }}
            to="/"
          >
            <Button>Go To Anime List</Button>
          </Link>
        </div>
      )}

      <ModalCreateCollection
        show={showModalEdit}
        title={currentCollection.title}
        type="edit"
        isValid={isValid}
        onChangeInput={onChangeInput}
        onClose={() => setModalEdit(false)}
        onSubmit={onSubmitEditCollection}
      />

      <ModalConfirmation
        show={showModalDelete}
        title={selectedAnime?.title?.userPreferred}
        onClose={closeModalConfirmation}
        onSubmit={onSubmitDeleteAnime}
        actionText="delete"
      />
    </Layout>
  );
};

export default CollectionDetail;

// let collections = [
//   {
//     title: "Judul Collec",
//     id: 1,
//     anime_list: [
//       {
//         id: 21,
//         title: {
//           english: "ONE PIECE",
//           native: "ONE PIECE",
//           userPreferred: "ONE PIECE",
//           romaji: "ONE PIECE",
//         },
//         coverImage: {
//           extraLarge:
//             "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-tXMN3Y20PIL9.jpg",
//           large:
//             "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx21-tXMN3Y20PIL9.jpg",
//           medium:
//             "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx21-tXMN3Y20PIL9.jpg",
//           color: "#e4a15d",
//         },
//         startDate: {
//           year: 1999,
//           month: 10,
//           day: 10,
//         },
//       },
//     ],
//   },
// ];
