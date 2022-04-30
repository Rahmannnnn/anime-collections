import styled from "@emotion/styled";
import { theme } from "../styles/Theme";
import { Heading, Paragraph } from "./Typography";
import { MdModeEdit, MdDelete, MdOutlinePhotoLibrary } from "react-icons/md";

const Collection = styled.div(
  () => `
    .description {
      padding: .5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: .5rem;
      
      color: ${theme.colors.lightGray};
      
      h1 {
        font-size: 14px;
      }

      .action {
        display: flex;
        gap: .5rem;
        align-items: center;
        justify-content: flex-end;

        &__icon {
          color: ${theme.colors.black};
          background: blue;
          padding: .5rem;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          cursor: pointer;

          &.edit {
            background: ${theme.colors.green};
          }
          
          &.delete {
            background: ${theme.colors.red};
          }
        }
      }
    }
  `
);

const CollectionItemContainer = styled.div(
  () => `
    aspect-ratio: 1;
    border-radius: .5rem;
    padding: .5rem;
    background: ${theme.colors.darkBlue};
    cursor: pointer;
    position: relative;
    overflow: hidden;
    box-shadow: 2px -1px 26px rgba(16,22,26,0.75);

    :hover > .title_container {
      transition: .25s;
      color: ${theme.colors.white};
    }

    .empty {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 100px;
      color: ${theme.colors.lightGray}
    }
  `
);

const ImageContainer = styled.div(
  () => `
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    
    overflow: hidden;
    position: relative;
    border-radius: .5rem;

    img {
      position: absolute;
      width: 100%;
      heigth: auto;
    }
  `
);

const CollectionEmptyContainer = styled(CollectionItemContainer)(
  () => `
    border: 1px dashed ${theme.colors.lightGray};
    background: transparent;
    color: ${theme.colors.lightGray};
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: relative;

    .plus_icon {
      font-size: 70px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    :hover {
      border: 1px dashed ${theme.colors.white};
      color: ${theme.colors.white};
      transition: .25s;
    }
  `
);

const CollectionItem = (props) => {
  const { type, title, withAction, image } = props;

  if (type === "empty") {
    return (
      <CollectionEmptyContainer
        data-testid="collection-item-empty"
        onClick={props.onAction}
      >
        <Paragraph className="plus_icon">+</Paragraph>
      </CollectionEmptyContainer>
    );
  }

  return (
    <Collection data-testid="collection-item">
      <CollectionItemContainer onClick={props.onAction}>
        {image ? (
          <ImageContainer>
            <img src={image} alt="banner" />
          </ImageContainer>
        ) : (
          <MdOutlinePhotoLibrary className="empty" />
        )}
      </CollectionItemContainer>
      <div className="description">
        <Heading onClick={props.onAction}>
          {title.length > 20 ? `${title.substring(0, 20)}...` : title || ""}
        </Heading>
        {withAction ? (
          <div className="action">
            <div
              className="action__icon edit"
              data-testid="edit-button"
              onClick={props.onEdit}
            >
              <MdModeEdit fontSize={20} />
            </div>
            <div
              className="action__icon delete"
              data-testid="delete-button"
              onClick={props.onDelete}
            >
              <MdDelete fontSize={20} />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </Collection>
  );
};

export default CollectionItem;
