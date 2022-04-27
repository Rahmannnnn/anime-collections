import styled from "@emotion/styled";
import { useState } from "react";
import AnimeItem from "../components/AnimeItem";
import { mq } from "../styles/Breakpoints";

import { useQuery } from "@apollo/client";
import { GET_ANIME_LIST } from "../graphql/Queries";

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
  const [page, setPage] = useState(1);

  const { error, loading, data } = useQuery(GET_ANIME_LIST, {
    fetchPolicy: "network-only",
    variables: { page: page },
  });

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error :(</p>;

  return (
    <AnimeListContainer>
      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      {data.Page.media.map(({ id, title, coverImage, startDate }, index) => (
        <AnimeItem
          id={id}
          title={title}
          coverImage={coverImage}
          startDate={startDate}
          key={index}
        />
      ))}
    </AnimeListContainer>
  );
};

export default AnimeList;
