import styled from "@emotion/styled";
import { mq } from "../styles/Breakpoints";

export const LayoutContainer = styled.div`
  width: 100%;

  ${mq("lg")} {
    margin: 2rem auto;
    max-width: 992px;
  }
`;

const Layout = (props) => {
  return (
    <LayoutContainer data-testid="layout">{props.children}</LayoutContainer>
  );
};

export default Layout;
