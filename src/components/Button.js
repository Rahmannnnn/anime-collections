import styled from "@emotion/styled";
import { theme } from "../styles/Theme";

const Button = styled.button(
  (props) => `
  padding: 1rem;
  background: ${props.background ? props.background : theme.colors.green};
  color: ${props.color ? props.color : theme.colors.black};
  outline: none;
  border: none;
  border-radius: .5rem;
  cursor: pointer;
  font-family: ${theme.fontFamily.openSans};
  font-weight: ${theme.fontWeight.bold};
  
  :hover {
    box-shadow: 2px -1px 26px rgba(16,22,26,0.75);
  }
  `
);

export { Button };
