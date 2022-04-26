import styled from "@emotion/styled";
import { mq } from "../styles/Breakpoints";
import Layout from "../layout/Layout";
import { theme } from "../styles/Theme";
import { Heading, Paragraph, Subheading } from "../components/Typography";
import { Button } from "../components/Button";
// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
  `
);

const AnimeDetail = () => {
  // TODO: Handle ID Anime to Call API
  // let params = useParams();

  const [item, setItem] = useState();
  const [width, setWidth] = useState(0);

  // TODO: set value when call API
  // const [status, setStatus] = useState('');
  // const [startDate, setStartDate] = useState('');
  // const [popularity, setPopularity] = useState(0);
  // const [season, setSeason] = useState("");
  // const [averageScore, setAverageScore] = useState(0);
  // const [meanScore, setMeanScore] = useState(0);
  // const [genres, setGenres] = useState([]);
  // const [title, setTitle] = useState({});
  // const [bannerImage, setBannerImage] = useState("");
  // const [coverImage, setCoverImage] = useState({});
  // const [recommendations, setRecommendations] = useState([]);

  const getAnimeDetail = () => {
    setItem({
      id: 21,
      title: {
        english: "ONE PIECE",
        native: "ONE PIECE",
      },
      description:
        "Gold Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the location of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece (which promises an unlimited amount of riches and fame), and quite possibly the most coveted of titles for the person who found it, the title of the Pirate King.<br><br>\nEnter Monkey D. Luffy, a 17-year-old boy that defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate who ransacks villages for fun, Luffy’s reason for being a pirate is one of pure wonder; the thought of an exciting adventure and meeting new and intriguing people, along with finding One Piece, are his reasons of becoming a pirate. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach One Piece.<br><br>\n<b>*This includes following special episodes:</b><br>\n- Chopperman to the Rescue! Protect the TV Station by the Shore! (Episode 336)<br>\n- The Strongest Tag-Team! Luffy and Toriko's Hard Struggle! (Episode 492)<br>\n- Team Formation! Save Chopper (Episode 542)<br>\n- History's Strongest Collaboration vs. Glutton of the Sea (Episode 590)<br>\n- 20th Anniversary! Special Romance Dawn (Episode 907)",
      genres: ["Action", "Adventure", "Comedy", "Drama", "Fantasy"],
      coverImage: {
        extraLarge:
          "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-tXMN3Y20PIL9.jpg",
        large:
          "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx21-tXMN3Y20PIL9.jpg",
        medium:
          "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx21-tXMN3Y20PIL9.jpg",
        color: "#e4a15d",
      },
      bannerImage:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg",
      recommendations: {
        nodes: [
          {
            mediaRecommendation: {
              id: 11061,
              title: {
                romaji: "HUNTER×HUNTER (2011)",
                english: "Hunter x Hunter (2011)",
                native: "HUNTER×HUNTER (2011)",
                userPreferred: "HUNTER×HUNTER (2011)",
              },
              coverImage: {
                extraLarge:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx11061-sIpBprNRfzCe.png",
                large:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx11061-sIpBprNRfzCe.png",
                medium:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx11061-sIpBprNRfzCe.png",
                color: "#f1d65d",
              },
            },
          },
          {
            mediaRecommendation: {
              id: 20,
              title: {
                romaji: "NARUTO",
                english: "Naruto",
                native: "NARUTO -ナルト-",
                userPreferred: "NARUTO",
              },
              coverImage: {
                extraLarge:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20-E3YH5W6sz6H7.jpg",
                large:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx20-E3YH5W6sz6H7.jpg",
                medium:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx20-E3YH5W6sz6H7.jpg",
                color: "#e4e450",
              },
            },
          },
          {
            mediaRecommendation: {
              id: 1735,
              title: {
                romaji: "NARUTO: Shippuuden",
                english: "Naruto: Shippuden",
                native: "NARUTO -ナルト- 疾風伝",
                userPreferred: "NARUTO: Shippuuden",
              },
              coverImage: {
                extraLarge:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1735-80JNLAlnxrKj.png",
                large:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1735-80JNLAlnxrKj.png",
                medium:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx1735-80JNLAlnxrKj.png",
                color: "#e4865d",
              },
            },
          },
          {
            mediaRecommendation: {
              id: 97940,
              title: {
                romaji: "Black Clover",
                english: "Black Clover",
                native: "ブラッククローバー",
                userPreferred: "Black Clover",
              },
              coverImage: {
                extraLarge:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx97940-bPydLjny8PUw.png",
                large:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx97940-bPydLjny8PUw.png",
                medium:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx97940-bPydLjny8PUw.png",
                color: "#6b6b1a",
              },
            },
          },
          {
            mediaRecommendation: {
              id: 223,
              title: {
                romaji: "Dragon Ball",
                english: "Dragon Ball",
                native: "ドラゴンボール",
                userPreferred: "Dragon Ball",
              },
              coverImage: {
                extraLarge:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx223-Ld6vrSnd081L.png",
                large:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx223-Ld6vrSnd081L.png",
                medium:
                  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx223-Ld6vrSnd081L.png",
                color: "#e49350",
              },
            },
          },
        ],
      },
      episodes: null,
      status: "RELEASING",
      startDate: {
        year: 1999,
        month: 10,
        day: 20,
      },
      endDate: {
        year: null,
        month: null,
        day: null,
      },
      averageScore: 87,
      season: "FALL",
      seasonYear: 1999,
      popularity: 330742,
    });
  };

  const handleResize = () => {
    const currentWidth = window.screen.width;
    setWidth(currentWidth);
  };

  useEffect(() => {
    getAnimeDetail();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleResize);
    };
  }, []);

  return (
    <div className="header">
      {item ? (
        <>
          <Banner bannerImage={item.bannerImage} />
          <Layout>
            <DescriptionContainer>
              <div className="desc">
                <img
                  src={
                    width > 992
                      ? item.coverImage.extraLarge
                      : width <= 992 && width > 500
                      ? item.coverImage.large
                      : item.coverImage.medium
                  }
                  alt="gambar"
                />

                <Button
                  background={theme.colors.green}
                  color={theme.colors.black}
                >
                  Add to collection
                </Button>
              </div>
              <div className="desc">
                <Heading>{item.title.english}</Heading>
                <Paragraph
                  dangerouslySetInnerHTML={{
                    __html: item.description,
                  }}
                ></Paragraph>
              </div>
              <div className="left">
                <Subheading fontSize={12} color={theme.colors.lightGray}>
                  Status
                </Subheading>
                <Subheading fontSize={12} color={theme.colors.lightGray}>
                  Start Date
                </Subheading>
                <Subheading fontSize={12} color={theme.colors.lightGray}>
                  Popularity
                </Subheading>
                <Subheading fontSize={12} color={theme.colors.lightGray}>
                  Season
                </Subheading>
                <Subheading fontSize={12} color={theme.colors.lightGray}>
                  Average Score
                </Subheading>
                <Subheading fontSize={12} color={theme.colors.lightGray}>
                  Mean Score
                </Subheading>
                <Subheading fontSize={12} color={theme.colors.lightGray}>
                  Genres
                </Subheading>
                <Subheading fontSize={12} color={theme.colors.lightGray}>
                  Source
                </Subheading>
                <Subheading fontSize={12} color={theme.colors.lightGray}>
                  Romaji
                </Subheading>
                <Subheading fontSize={12} color={theme.colors.lightGray}>
                  English
                </Subheading>
                <Subheading fontSize={12} color={theme.colors.lightGray}>
                  Native
                </Subheading>
              </div>
              <div className="right">
                <Subheading fontSize={14} color={theme.colors.lightGray}>
                  Collections
                </Subheading>
                <RecommendationsContainer>
                  <Subheading fontSize={14} color={theme.colors.lightGray}>
                    Recommendations
                  </Subheading>
                </RecommendationsContainer>
              </div>
            </DescriptionContainer>
          </Layout>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default AnimeDetail;
