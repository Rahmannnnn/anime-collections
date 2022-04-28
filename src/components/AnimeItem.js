import styled from "@emotion/styled";

import { Heading, Paragraph } from "./Typography";

import { theme } from "../styles/Theme";
import { mq } from "../styles/Breakpoints";
import { Link } from "react-router-dom";

const AnimeItemContainer = styled.div(
  (props) => `
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: center;

  a {
    text-decoration: none;
  }

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

  .image_container {
    position: relative;

    .checkbox {
      position: absolute;
      top: .5rem;
      left: 20%;

      width: 30px;
      height: 30px;
      background: ${props.checked ? theme.colors.green : theme.colors.darkBlue};
      border: 1px solid ${
        props.checked ? theme.colors.green : theme.colors.darkBlue
      };
      border-radius: .5rem;

      display: flex;
      justify-content: center;
      align-items: center;
      color:${props.checked ? theme.colors.black : theme.colors.white};
      font-weight: 900;
    }
  }
  ${
    !props.isMultipleSelect
      ? ` :hover {
    h1, p {
      transition: .25s ease-in-out;
      color: ${theme.colors.white};
    }
  }`
      : ""
  }
`
);

const AnimeItem = (props) => {
  const { title, coverImage, startDate, id, isMultipleSelect, checked } = props;

  return (
    <AnimeItemContainer isMultipleSelect={isMultipleSelect} checked={checked}>
      {!isMultipleSelect ? (
        <Link
          style={{
            textDecoration: "none",
            color: theme.colors.darkBlue,
          }}
          to={`../anime/${id}`}
        >
          {coverImage ? (
            <div>
              <img src={coverImage.large} alt={title} />
            </div>
          ) : (
            ""
          )}
          <Heading color={theme.colors.lightGray}>
            {title.userPreferred}
          </Heading>
          <Paragraph color={theme.colors.lightGray}>{startDate.year}</Paragraph>
        </Link>
      ) : (
        <div onClick={props.onMultipleSelect}>
          {coverImage ? (
            <div className="image_container">
              <img src={coverImage.large} alt={title} />
              <div className="checkbox">
                {checked ? <Paragraph>&#128504;</Paragraph> : ""}
              </div>
            </div>
          ) : (
            ""
          )}
          <Heading color={theme.colors.lightGray}>
            {title.userPreferred}
          </Heading>
          <Paragraph color={theme.colors.lightGray}>{startDate.year}</Paragraph>
        </div>
      )}
    </AnimeItemContainer>
  );
};

export default AnimeItem;
