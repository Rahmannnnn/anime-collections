import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_ANIME_DETAIL } from "../graphql/Queries";

import { mq } from "../styles/Breakpoints";
import styled from "@emotion/styled";
import { theme } from "../styles/Theme";

import Layout from "../layout/Layout";
import ModalAddToCollection from "../components/ModalAddToCollection";
import ModalCreateCollection from "../components/ModalCreateCollection";
import { Button } from "../components/Button";
import { Heading, Paragraph, Subheading } from "../components/Typography";

import { MONTH_SHORT } from "../constants/date";
import Loading from "../components/Loading";
import { indexArrayOfObject } from "../utils/Array";
import CollectionItem from "../components/CollectionItem";

const Banner = styled.div(
  (props) => `
  position: relative;

  background-image: url('${props ? props.bannerImage : ""}');
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${theme.colors.darkBlue};
  height: 40vh;
`
);

const DescriptionContainer = styled.div(
  () => `
  display: flex;
  flex-direction: column;
  gap: 1rem;
  grid-template-columns: 1fr;
  margin: 1rem 1rem;
  min-height: 250px;

  .desc {
    z-index: 1;
    display: flex;
    flex-direction: column;
    color: ${theme.colors.white};

    h1 {
      font-size: 1rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: .75rem;
    }
  }

  img {
    z-index: 1;
    box-shadow: 2px -1px 26px rgba(16,22,26,0.75);
    width: 30%;
    border-radius: 0.5rem;
    margin: 0 auto;
    margin-top: -25%;
  }
  
  button {
    width: 30%;
    margin: 1rem auto;
  }

  .left {
    order: 4;
    background: ${theme.colors.darkBlue};
    width: -webkit-fill-available;
    margin: 0 auto;
    padding: .5rem;
    border-radius: .5rem;

    .text {
      margin-bottom: 1rem;
      font-size: .75rem;
      color: ${theme.colors.white};

      ${mq("md")} {
        font-size: .875rem;
      }

      &_genres {
        margin-bottom: 1rem;
      }
    }
  }

  ${mq("md")} {
    grid-gap: 1rem;
    display: grid;
    grid-template-columns: 1fr 2fr;

    button {
      margin-top: 1rem;
      width: 75%;
    }

    img {
      width: 75%;
      border-radius: .5rem;
      margin-top: -75%;
    }
    
    .desc {
      h1 {
        font-size: 1.25rem;
      }
  
      p {
        font-size: .875rem;
      }
    }

    .left {
      width: 75%;
      order: 0;
    }
  }
`
);

const CollectionsContainer = styled.div`
  min-height: 100px;

  .collections_list {
    margin: 1rem 0;
    display: grid;
    grid-gap: 0.5rem;
    grid-template-columns: repeat(3, 1fr);

    ${mq("md")} {
      grid-gap: 1rem;
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

const AnimeDetail = () => {
  let params = useParams();

  const { error, loading, data } = useQuery(GET_ANIME_DETAIL, {
    fetchPolicy: "network-only",
    variables: { id: parseInt(params.animeId) },
  });

  const [width, setWidth] = useState(0);

  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [popularity, setPopularity] = useState(0);
  const [season, setSeason] = useState("");
  const [averageScore, setAverageScore] = useState(0);
  const [meanScore, setMeanScore] = useState(0);
  const [genres, setGenres] = useState([]);
  const [title, setTitle] = useState({});
  const [description, setDescription] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [coverImage, setCoverImage] = useState({});
  const [source, setSource] = useState("");

  const [showModalAddCollection, setshowModalAddCollection] = useState(false);
  const [showModalCreateCollection, setshowModalCreateCollection] =
    useState(false);
  const [isValid, setValid] = useState(true);

  const [collectionsList, setCollectionsList] = useState([]);
  const [animeCollections, setAnimeCollections] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState({});

  const handleResize = () => {
    const currentWidth = window.screen.width;
    setWidth(currentWidth);
  };

  const showModalAdd = () => {
    setshowModalAddCollection(true);
  };

  const closeModalAdd = () => {
    setshowModalAddCollection(false);
  };

  const submitModalAdd = (collectionsList) => {
    setCollectionsList(collectionsList);
    localStorage.setItem("collections", JSON.stringify(collectionsList));

    closeModalAdd();
  };

  const showModalCreate = () => {
    closeModalAdd();
    setshowModalCreateCollection(true);
  };

  const closeModalCreate = () => {
    setshowModalCreateCollection(false);
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

  useEffect(() => {
    let result = [];

    collectionsList.forEach((item) => {
      const { anime_list } = item;
      let index = indexArrayOfObject(
        anime_list,
        "id",
        parseInt(params.animeId)
      );

      if (index !== -1) {
        result.push(item);
      }
    });

    setAnimeCollections(result);
  }, [collectionsList, params.animeId]);

  useEffect(() => {
    let result = {};
    if (animeCollections.length) {
      animeCollections.forEach((element) => {
        result[element.id] = true;
      });
    }

    setSelectedCollections(result);
  }, [animeCollections]);

  useEffect(() => {
    getCollectionsList();
  }, []);

  useEffect(() => {
    if (data) {
      const {
        bannerImage,
        coverImage,
        title,
        description,
        status,
        startDate,
        popularity,
        season,
        averageScore,
        meanScore,
        genres,
        source,
      } = data.Media;

      setBannerImage(bannerImage);
      setCoverImage(coverImage);
      setTitle(title);
      setDescription(description);

      setStatus(status);
      setStartDate(
        `${MONTH_SHORT[startDate.month - 1]} ${startDate.day}, ${
          startDate.year
        }`
      );
      setPopularity(popularity);
      setSeason(season);
      setAverageScore(averageScore);
      setMeanScore(meanScore);
      setGenres(genres);
      setSource(source);
    }
  }, [data]);

  useEffect(() => {
    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleResize);
    };
  }, []);

  if (loading) return <Loading />;

  if (error) return <Navigate to="/" />;

  return (
    <>
      <Banner bannerImage={bannerImage} />
      <Layout>
        <DescriptionContainer>
          <div className="desc">
            <img
              src={
                width > 992
                  ? coverImage.extraLarge
                  : width <= 992 && width > 500
                  ? coverImage.large
                  : coverImage.medium
              }
              alt="gambar"
            />

            <Button
              background={theme.colors.green}
              color={theme.colors.black}
              onClick={showModalAdd}
            >
              Add to collection
            </Button>
          </div>
          <div className="desc">
            <Heading>{title.english}</Heading>
            <Paragraph
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            ></Paragraph>
          </div>
          <div className="left">
            <Subheading fontSize={12} color={theme.colors.lightGray}>
              Status
            </Subheading>
            <Paragraph className="text">{status || "-"}</Paragraph>
            <Subheading fontSize={12} color={theme.colors.lightGray}>
              Start Date
            </Subheading>
            <Paragraph className="text">{startDate || "-"}</Paragraph>
            <Subheading fontSize={12} color={theme.colors.lightGray}>
              Popularity
            </Subheading>
            <Paragraph className="text">{popularity || 0}</Paragraph>
            <Subheading fontSize={12} color={theme.colors.lightGray}>
              Season
            </Subheading>
            <Paragraph className="text">{season || "-"}</Paragraph>
            <Subheading fontSize={12} color={theme.colors.lightGray}>
              Average Score
            </Subheading>
            <Paragraph className="text">{averageScore || 0}%</Paragraph>
            <Subheading fontSize={12} color={theme.colors.lightGray}>
              Mean Score
            </Subheading>
            <Paragraph className="text">{meanScore || 0}%</Paragraph>
            <Subheading fontSize={12} color={theme.colors.lightGray}>
              Genres
            </Subheading>
            <div className="text_genres">
              {genres.map((element, index) => (
                <Paragraph
                  fontSize={14}
                  color={theme.colors.white}
                  key={"genre-anime-detail-" + index}
                >
                  {element || "-"}
                </Paragraph>
              ))}
            </div>
            <Subheading fontSize={12} color={theme.colors.lightGray}>
              Source
            </Subheading>
            <Paragraph className="text">{source || "-"}</Paragraph>
            {}
            <Subheading fontSize={12} color={theme.colors.lightGray}>
              Romaji
            </Subheading>
            <Paragraph className="text">{title.romaji || "-"}</Paragraph>
            <Subheading fontSize={12} color={theme.colors.lightGray}>
              English
            </Subheading>
            <Paragraph className="text">{title.english || "-"}</Paragraph>
            <Subheading fontSize={12} color={theme.colors.lightGray}>
              Native
            </Subheading>
            <Paragraph className="text">{title.native || "-"}</Paragraph>
          </div>
          <div className="right">
            {animeCollections?.length ? (
              <CollectionsContainer>
                <Subheading fontSize={14} color={theme.colors.lightGray}>
                  Collections
                </Subheading>
                <div className="collections_list">
                  {animeCollections.map((element) => (
                    <Link
                      style={{
                        textDecoration: "none",
                        color: theme.colors.darkBlue,
                      }}
                      to={`../collections/${element.id}`}
                      key={"collection-item-anime-detail-" + element.id}
                    >
                      <CollectionItem
                        id={element.id}
                        title={element.title}
                        withAction={false}
                        image={
                          element.anime_list.length
                            ? element.anime_list[0].coverImage.large
                            : ""
                        }
                      />
                    </Link>
                  ))}
                </div>
              </CollectionsContainer>
            ) : (
              ""
            )}
          </div>
        </DescriptionContainer>

        <ModalAddToCollection
          show={showModalAddCollection}
          collections={collectionsList}
          selectedCollectionsProps={selectedCollections}
          addedAnimeList={[
            { id: params.animeId, title, coverImage, startDate },
          ]}
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
    </>
  );
};

export default AnimeDetail;
