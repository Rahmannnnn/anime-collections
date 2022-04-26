import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import AnimeItem from "../components/AnimeItem";
import { mq } from "../styles/Breakpoints";

const AnimeListContainer = styled.div(
  () => `
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 1rem;
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

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);

  const getAnimeList = () => {
    setAnimeList([
      {
        id: 88187,
        title: {
          romaji: "Ore, Twintail ni Narimasu.",
          english: null,
          native: "俺、ツインテールになります。",
          userPreferred: "Ore, Twintail ni Narimasu.",
        },

        coverImage: {
          extraLarge:
            "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-tXMN3Y20PIL9.jpg",
          large:
            "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx21-tXMN3Y20PIL9.jpg",
          medium:
            "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx21-tXMN3Y20PIL9.jpg",
        },
        bannerImage:
          "https://s4.anilist.co/file/anilistcdn/media/anime/banner/24-THD6AYmlVPIb.jpg",
        startDate: {
          year: 1998,
          month: 4,
          day: 3,
        },
      },
      {
        id: 8818,
        title: {
          romaji: "Ore, Twintail ni Narimasu.",
          english: null,
          native: "俺、ツインテールになります。",
          userPreferred: "Ore, Twintail ni Narimasu.",
        },
        coverImage: {
          extraLarge:
            "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-tXMN3Y20PIL9.jpg",
          large:
            "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx21-tXMN3Y20PIL9.jpg",
          medium:
            "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx21-tXMN3Y20PIL9.jpg",
        },
        bannerImage: null,
        startDate: {
          year: 1998,
          month: 4,
          day: 3,
        },
      },
      {
        id: 881,
        title: {
          romaji: "Ore, Twintail ni Narimasu.",
          english: null,
          native: "俺、ツインテールになります。",
          userPreferred: "Ore, Twintail ni Narimasu.",
        },
        coverImage: {
          extraLarge:
            "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-tXMN3Y20PIL9.jpg",
          large:
            "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx21-tXMN3Y20PIL9.jpg",
          medium:
            "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx21-tXMN3Y20PIL9.jpg",
        },
        bannerImage: null,
        startDate: {
          year: 1998,
          month: 4,
          day: 3,
        },
      },
      {
        id: 88,
        title: {
          romaji: "Ore, Twintail ni Narimasu.",
          english: null,
          native: "俺、ツインテールになります。",
          userPreferred: "Ore, Twintail ni Narimasu.",
        },
        coverImage: {
          extraLarge:
            "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-tXMN3Y20PIL9.jpg",
          large:
            "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx21-tXMN3Y20PIL9.jpg",
          medium:
            "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx21-tXMN3Y20PIL9.jpg",
        },
        bannerImage: null,
        startDate: {
          year: 1998,
          month: 4,
          day: 3,
        },
      },
      {
        id: 8,
        title: {
          romaji: "Ore, Twintail ni Narimasu.",
          english: null,
          native: "俺、ツインテールになります。",
          userPreferred: "Ore, Twintail ni Narimasu.",
        },
        coverImage: {
          extraLarge:
            "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-tXMN3Y20PIL9.jpg",
          large:
            "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx21-tXMN3Y20PIL9.jpg",
          medium:
            "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx21-tXMN3Y20PIL9.jpg",
        },
        bannerImage: null,
        startDate: {
          year: 1998,
          month: 4,
          day: 3,
        },
      },
    ]);

    setAnimeList((valueBefore) => valueBefore.concat(valueBefore));
  };

  useEffect(() => {
    getAnimeList();
  }, []);

  return (
    <div>
      <AnimeListContainer>
        {animeList.map(
          ({ title, coverImage, bannerImage, startDate }, index) => (
            <AnimeItem
              title={title}
              coverImage={coverImage}
              bannerImage={bannerImage}
              startDate={startDate}
              key={index}
            />
          )
        )}
      </AnimeListContainer>
    </div>
  );
};

export default AnimeList;
