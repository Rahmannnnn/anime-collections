import styled from "@emotion/styled";
import { theme } from "../styles/Theme";

const Button = styled.button(
  (props) => `
  padding: 1rem;
  background: ${
    props.disabled
      ? theme.colors.lightGray
      : props.background
      ? props.background
      : theme.colors.green
  };
  color: ${props.color ? props.color : theme.colors.black};
  outline: none;
  border: none;
  border-radius: .5rem;
  cursor: ${props.disabled ? "disable" : "pointer"};
  font-family: ${theme.fontFamily.openSans};
  font-weight: ${theme.fontWeight.bold};

  ${
    !props.disabled
      ? `:hover {
      box-shadow: 2px -1px 26px rgba(16,22,26,0.75);
    }`
      : ""
  }
  `
);

export { Button };
