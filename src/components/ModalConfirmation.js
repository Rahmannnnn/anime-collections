import ModalGeneral from "../layout/ModalGeneral";
import { Button } from "../components/Button";
import { theme } from "../styles/Theme";
import styled from "@emotion/styled";
import { Heading } from "./Typography";

const ModalConfirmationContainer = styled.div(
  () => `
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem;

    .content {
      margin: 3rem 0;

      h1 {
        color: ${theme.colors.white};
        margin-bottom: 1rem;
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
const ModalConfirmation = (props) => {
  const { show, title, actionText } = props;

  const onClose = () => {
    props.onClose();
  };

  const onSubmit = () => {
    props.onSubmit();
  };

  return (
    <ModalGeneral show={show} onClose={onClose}>
      <ModalConfirmationContainer>
        <div className="content">
          <Heading>
            Are you sure you want to {actionText} "{title}"?
          </Heading>
        </div>
        <div className="action">
          <Button onClick={onClose} background={theme.colors.red}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>Confirm</Button>
        </div>
      </ModalConfirmationContainer>
    </ModalGeneral>
  );
};

export default ModalConfirmation;
