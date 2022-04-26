import styled from "@emotion/styled";

const Heading = styled("h1")`
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
  font-size: ${(props) => (props.fontSize ? props.fontSize : 20)}px;
  margin: 0;
`;

const Subheading = Heading.withComponent("h2");
const Paragraph = Heading.withComponent("p");

export { Heading, Subheading, Paragraph };
