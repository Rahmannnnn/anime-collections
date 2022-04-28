import styled from "@emotion/styled";
import { useState } from "react";
import AnimeItem from "../components/AnimeItem";
import { mq } from "../styles/Breakpoints";

import { useQuery } from "@apollo/client";
import { GET_ANIME_LIST } from "../graphql/Queries";
import Layout from "../layout/Layout";
import Loading from "../components/Loading";

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

const AnimeList = () => {
  const [page] = useState(1);

  const { error, loading, data } = useQuery(GET_ANIME_LIST, {
    fetchPolicy: "network-only",
    variables: { page: page },
  });

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  return (
    <Layout>
      <AnimeListContainer>
        {data.Page.media.map(({ id, title, coverImage, startDate }, index) => (
          <AnimeItem
            id={id}
            title={title}
            coverImage={coverImage}
            startDate={startDate}
            key={"anime-list-home-" + index}
          />
        ))}
      </AnimeListContainer>
    </Layout>
  );
};

export default AnimeList;
