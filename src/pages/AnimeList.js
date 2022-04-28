import styled from "@emotion/styled";
import { useState } from "react";
import AnimeItem from "../components/AnimeItem";
import { mq } from "../styles/Breakpoints";

import { useQuery } from "@apollo/client";
import { GET_ANIME_LIST } from "../graphql/Queries";
import Layout from "../layout/Layout";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";

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

const AnimeList = () => {
  const [page, setPage] = useState(1);

  const { error, loading, data } = useQuery(GET_ANIME_LIST, {
    fetchPolicy: "network-only",
    variables: { page: page },
  });

  const pagination = (number) => {
    setPage(number);
  };

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  return (
    <Layout>
      <AnimeListContainer>
        {data.Page.media.map(({ id, title, coverImage, startDate }, index) => (
          <AnimeItemContainer>
            <AnimeItem
              id={id}
              title={title}
              coverImage={coverImage}
              startDate={startDate}
              key={"anime-list-home-" + index}
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
