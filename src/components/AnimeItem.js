import styled from "@emotion/styled";
import { Heading, Paragraph } from "./Typography";
import { theme } from "../styles/Theme";
import { mq } from "../styles/Breakpoints";
const AnimeItemContainer = styled.div(
  () => `
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: center;

  img {
    border-radius: .5rem;
    max-width: 150px;
    margin: 0 auto;
    margin-bottom: 1rem;
    box-shadow: 2px -1px 26px rgba(16,22,26,0.75);
  }

  h1 {
    font-size: .875rem;
  }

  p {
    font-size: .75rem;
  }

  ${mq("md")} {
    h1 {
      font-size: 1rem;
    }

    p {
      font-size: .875rem;
    }
  }

  :hover {
    h1, p {
      transition: .25s ease-in-out;
      color: ${theme.colors.white};
    }
  }
`
);

const AnimeItem = (props) => {
  const { title, coverImage, startDate } = props;

  return (
    <AnimeItemContainer>
      {coverImage ? <img src={coverImage.large} alt={title} /> : ""}
      <Heading fontSize={16} color={theme.colors.lightGray}>
        {title.userPreferred}
      </Heading>
      <Paragraph fontSize={14} color={theme.colors.lightGray}>
        {startDate.year}
      </Paragraph>
    </AnimeItemContainer>
  );
};

export default AnimeItem;
