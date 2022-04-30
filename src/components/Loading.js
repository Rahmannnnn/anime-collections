import styled from "@emotion/styled";
import React from "react";
import { theme } from "../styles/Theme";

const LoadingContainer = styled.div`
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 10px solid ${theme.colors.lightGray};
    border-top: 10px solid ${theme.colors.black};
    border-radius: 50%;
    animation: spinner 1.5s linear infinite;
  }
`;

const Loading = () => {
  return (
    <LoadingContainer data-testid="loading">
      <div className="loading-spinner"></div>
    </LoadingContainer>
  );
};

export default Loading;
