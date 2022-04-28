import styled from "@emotion/styled";
import ModalGeneral from "../layout/ModalGeneral";
import { theme } from "../styles/Theme";
import { Heading, Paragraph, Subheading } from "./Typography";

import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import { AddUniqueObjectToArray, indexArrayOfObject } from "../utils/Array";

const EmptyCollectionsList = styled.div(
  () => `
    min-height: 100px;
    background: ${theme.colors.darkBlue};
    border-radius: .5rem;
    padding: .5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      border: 1px dashed ${theme.colors.lightGray};
      padding: .5rem;
    }
  `
);

const ModalAddToCollectionContainer = styled.div(
  () => `
display: flex;
flex-direction: column;
gap: .5rem;
margin: 1rem;

.content {
  margin-bottom: 3rem;

  h1 {
    color: ${theme.colors.white};
    margin-bottom: .5rem;
    text-align: center;
  }
}

.action {
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: space-between;

  button {
    width: 100%;
    max-width: 200px;
  }
}
`
);

const CollectionsContainer = styled.div(
  () => `
    background: ${theme.colors.darkBlue};
    border-radius: .5rem;
    padding: .5rem;
    max-height: 150px;
    overflow: auto;

    ::-webkit-scrollbar {
      width: 7.5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: ${theme.colors.black};
      opacity: 0;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: ${theme.colors.gray};
      border-radius: 10px;
      margin: 20px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #0f4c75;
    }
`
);

const CollectionItemCheckbox = (props) => {
  const CollectionItemContainer = styled.div(
    (props) => `
      background: ${theme.colors.darkBlue};
      color: ${theme.colors.white};
      border: 1px solid ${
        props.checked ? theme.colors.green : theme.colors.black
      };
      cursor: pointer;
      padding: .5rem;
      border-radius: .5rem;
      margin: .5rem;

      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: .5rem;

      .checkbox {
        background: ${props.checked ? "transparent" : theme.colors.darkBlue};
        border: 1px solid ${
          props.checked ? theme.colors.green : theme.colors.black
        };
        width: 25px;
        height: 25px;
        border-radius: .25rem;
        display: flex;
        align-items: center;
        justify-content: center;

        p {
          opacity: ${props.checked ? "1" : "0"};
        }
      }

      p {
        font-size: .875rem;
      }
    `
  );

  const setCheck = () => {
    props.setCheck();
  };

  return (
    <CollectionItemContainer onClick={setCheck} checked={props.checked}>
      <div className="checkbox">
        <Paragraph>&#128504;</Paragraph>
      </div>
      <Paragraph>{props.title || ""}</Paragraph>
    </CollectionItemContainer>
  );
};

const ModalAddToCollection = (props) => {
  const { show, collections, selectedCollectionsProps, addedAnimeList } = props;

  const [collectionsListWithSelected, setCollectionsListWithSelected] =
    useState([]);

  const handleClick = (index) => {
    let temp = [...collectionsListWithSelected];

    if (temp[index].checked) {
      temp[index].checked = false;
    } else {
      temp[index].checked = true;
    }

    setCollectionsListWithSelected(temp);
  };

  const onClose = () => {
    props.onClose();
  };

  const onSubmit = () => {
    let collectionsListTemp = [...collectionsListWithSelected];

    if (addedAnimeList?.length) {
      collectionsListTemp.forEach((element, index) => {
        const { checked, anime_list } = element;

        if (checked) {
          addedAnimeList.forEach((anime) => {
            collectionsListTemp[index].anime_list = AddUniqueObjectToArray(
              anime_list,
              "id",
              anime
            );
          });

          delete collectionsListTemp[index].checked;
        }
      });
    }

    props.onSubmit(collectionsListTemp);
  };

  const onAdd = () => {
    props.onAdd();
  };

  useEffect(() => {
    if (collections?.length && show) {
      let newCollections = [...collections];

      if (selectedCollectionsProps?.length) {
        selectedCollectionsProps.forEach((element) => {
          let index = indexArrayOfObject(newCollections, "id", element.id);
          if (index !== -1) {
            newCollections[index] = { ...element, checked: true };
          }
        });
      }

      setCollectionsListWithSelected(newCollections);
    } else if (!show) {
      setCollectionsListWithSelected([]);
    }
  }, [show, selectedCollectionsProps, collections]);

  return (
    <ModalGeneral show={show} onClose={onClose}>
      <ModalAddToCollectionContainer>
        <div className="content">
          <Heading>Add To Collections</Heading>
          <Subheading
            style={{ marginBottom: ".5rem" }}
            fontSize={12}
            color={theme.colors.lightGray}
          >
            add anime(s):
          </Subheading>
          {addedAnimeList?.length ? (
            <CollectionsContainer
              style={{ maxHeight: "100px", marginBottom: ".5rem" }}
            >
              {addedAnimeList.map((item) => (
                <Paragraph
                  fontSize={14}
                  color={theme.colors.white}
                  key={"anime-list-modal-add-" + item.id}
                  style={{ marginBottom: ".5rem" }}
                >
                  {item.title.romaji}
                </Paragraph>
              ))}
            </CollectionsContainer>
          ) : (
            ""
          )}

          <Subheading
            style={{ marginBottom: ".5rem" }}
            fontSize={12}
            color={theme.colors.lightGray}
          >
            to collection(s):
          </Subheading>
          {collectionsListWithSelected?.length ? (
            <>
              <CollectionsContainer>
                {collectionsListWithSelected.map((item, index) => (
                  <CollectionItemCheckbox
                    key={"collection-checkbox-modal-add-" + index}
                    id={item.id}
                    title={item.title}
                    checked={item.checked || false}
                    setCheck={() => handleClick(index)}
                  ></CollectionItemCheckbox>
                ))}
              </CollectionsContainer>
              <Button
                background={theme.colors.darkBlue}
                color={theme.colors.white}
                style={{
                  float: "right",
                  marginTop: ".5rem",
                  border: `1px dashed ${theme.colors.lightGray}`,
                  padding: ".5rem",
                }}
                onClick={onAdd}
              >
                + Create new collection
              </Button>
            </>
          ) : (
            <EmptyCollectionsList>
              <Button
                background={theme.colors.darkBlue}
                color={theme.colors.white}
                onClick={onAdd}
              >
                + Create new collection
              </Button>
            </EmptyCollectionsList>
          )}
        </div>
        <div className="action">
          <Button onClick={onClose} background={theme.colors.red}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>Submit</Button>
        </div>
      </ModalAddToCollectionContainer>
    </ModalGeneral>
  );
};

export default ModalAddToCollection;
