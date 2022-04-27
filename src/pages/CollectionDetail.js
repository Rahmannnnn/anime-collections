import { useEffect, useState } from "react";
import { Heading } from "../components/Typography";
import { MdModeEdit } from "react-icons/md";
import AnimeItem from "../components/AnimeItem";
import styled from "@emotion/styled";
import { mq } from "../styles/Breakpoints";
import { Button } from "../components/Button";
import { theme } from "../styles/Theme";
import Layout from "../layout/Layout";
import ModalCreateCollection from "../components/ModalCreateCollection";

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
      flex: 1;
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
  const [title, setTitle] = useState("");
  const [animeList, setAnimeList] = useState([]);

  const [showModalEdit, setModalEdit] = useState(false);
  const [isValid, setValid] = useState(true);

  const getCollectionDetail = () => {
    setTitle(
      "Arip AripAripAripAripArip AripAripArip AripAripArip AripAripArip"
    );
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
    ]);

    setValid(true);
  };

  const onChangeInput = (input) => {
    console.log(input);
  };

  const onSubmitEditCollection = () => {
    console.log("edited");
  };

  useEffect(() => {
    getCollectionDetail();
  }, []);

  return (
    <Layout>
      <CollectionDetailTitle>
        <Heading>{title || ""}</Heading>
        <MdModeEdit className="icon" onClick={() => setModalEdit(true)} />
      </CollectionDetailTitle>
      <AnimeListContainer>
        {animeList.map(
          ({ id, title, coverImage, bannerImage, startDate }, index) => (
            <div key={index} className="anime_item">
              <AnimeItem
                id={id}
                title={title}
                coverImage={coverImage}
                bannerImage={bannerImage}
                startDate={startDate}
              />

              <Button background={theme.colors.red}>Delete</Button>
            </div>
          )
        )}
      </AnimeListContainer>

      <ModalCreateCollection
        show={showModalEdit}
        title={title}
        type="edit"
        isValid={isValid}
        onChangeInput={onChangeInput}
        onClose={() => setModalEdit(false)}
        onSubmit={onSubmitEditCollection}
      />
    </Layout>
  );
};

export default CollectionDetail;
