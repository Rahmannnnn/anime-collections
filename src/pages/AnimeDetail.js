import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_ANIME_DETAIL } from "../graphql/Queries";

import { mq } from "../styles/Breakpoints";
import styled from "@emotion/styled";
import { theme } from "../styles/Theme";

import AnimeItem from "../components/AnimeItem";
import Layout from "../layout/Layout";
import ModalAddToCollection from "../components/ModalAddToCollection";
import ModalCreateCollection from "../components/ModalCreateCollection";
import { Button } from "../components/Button";
import { Heading, Paragraph, Subheading } from "../components/Typography";

import { MONTH_SHORT } from "../constants/date";

const Banner = styled.div(
  (props) => `
  position: relative;

  background-image: url('${props ? props.bannerImage : ""}');
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${theme.colors.white};
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

const RecommendationsContainer = styled.div(
  () => `
    min-height: 100px;

    .recommendation_list {
      margin: 1rem 0;
      display: grid;
      grid-gap: .5rem;
      grid-template-columns: repeat(2, 1fr);
      
      ${mq("md")} {
        grid-gap: 1rem;
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `
);

const AnimeDetail = () => {
  // TODO: Handle ID Anime to Call API
  let params = useParams();

  const { error, loading, data } = useQuery(GET_ANIME_DETAIL, {
    variables: { id: parseInt(params.animeId) },
  });

  // const [item, setItem] = useState();
  const [width, setWidth] = useState(0);

  // TODO: set value when call API
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
  const [recommendations, setRecommendations] = useState([]);
  const [source, setSource] = useState("");

  const [showModalAddCollection, setshowModalAddCollection] = useState(false);
  const [showModalCreateCollection, setshowModalCreateCollection] =
    useState(false);
  const [isValid, setValid] = useState(true);

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
    console.log(collectionsList);
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

  const submitModalCreate = () => {
    console.log("create");
    closeModalCreate();
  };

  const onChangeInput = (input) => {
    console.log(input);
  };

  useEffect(() => {
    setValid(true);
  }, []);

  useEffect(() => {
    if (data) {
      const {
        bannerImage,
        coverImage,
        title,
        description,
        recommendations,
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

      setRecommendations(recommendations.nodes);
    }
  }, [data]);

  useEffect(() => {
    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleResize);
    };
  }, []);

  if (loading) return <p></p>;

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
                  key={"genre" + index}
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
            <Subheading fontSize={14} color={theme.colors.lightGray}>
              Collections
            </Subheading>
            {recommendations.length ? (
              <RecommendationsContainer>
                <Subheading fontSize={14} color={theme.colors.lightGray}>
                  Recommendations
                </Subheading>
                <div className="recommendation_list">
                  {recommendations.map(({ mediaRecommendation }, index) => (
                    <AnimeItem
                      id={mediaRecommendation.id}
                      title={mediaRecommendation.title}
                      coverImage={mediaRecommendation.coverImage}
                      startDate={mediaRecommendation.startDate}
                      key={index}
                    />
                  ))}
                </div>
              </RecommendationsContainer>
            ) : (
              ""
            )}
          </div>
        </DescriptionContainer>

        <ModalAddToCollection
          show={showModalAddCollection}
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
