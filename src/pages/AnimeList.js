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
  `
);

const AnimeList = () => {
  const [page, setPage] = useState(1);
  const [isMultipleSelect, setIsMultipleSelect] = useState(false);
  const [selectedAnimeList, setSelectedAnimeList] = useState({});
  const [arraySelected, setArraySelected] = useState([]);

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
          disabled={isMultipleSelect}
          onClick={() => setIsMultipleSelect(!isMultipleSelect)}
        >
          Select multiple
        </Button>
        {isMultipleSelect ? <Button>Add to collections</Button> : ""}
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
    </Layout>
  );
};

export default AnimeList;
