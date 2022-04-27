import styled from "@emotion/styled";
import { mq } from "../styles/Breakpoints";
import { theme } from "../styles/Theme";

const ModalGeneralContainer = styled.div(
  () => `
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    
    .overlay {
      position: fixed;
      background: rgba(0,0,0,.75);
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }

    .container {
      width: 80vw;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: .5rem;
      padding: .5rem;
      background: ${theme.colors.black};

      ::-webkit-scrollbar {
        width: 7.5px;
      }

      ::-webkit-scrollbar-track {
        background: ${theme.colors.black};
        border-radius: .5rem;
        opacity: 0;
      }

      ::-webkit-scrollbar-thumb {
        background: ${theme.colors.gray};
        border-radius: 10px 0 0 10px;
        margin: 20px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #0f4c75;
      }

      ${mq("md")} {
        max-width: 600px;
        max-height: 600px;
      }
    }
  `
);

const ModalGeneral = (props) => {
  const { show } = props;

  const onClose = () => {
    props.onClose();
  };
  if (show) {
    return (
      <ModalGeneralContainer>
        <div className="overlay" onClick={onClose}></div>
        <div className="container">{props.children}</div>
      </ModalGeneralContainer>
    );
  }
};

export default ModalGeneral;
