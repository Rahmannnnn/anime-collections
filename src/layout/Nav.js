import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";

import styled from "@emotion/styled";
import { theme } from "../styles/Theme";
import { mq } from "../styles/Breakpoints";

const Navigation = styled.nav(
  (props) => `
  background: ${props["scroll"] ? theme.colors.black : "rgba(28, 28, 39, .5)"};
  box-shadow: ${props["scroll"] ? "2px -1px 26px rgba(16,22,26,0.75)" : ""};
  
  transition: .25s;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 2;

  .link {
    padding: 1rem 0;
    color: ${theme.colors.white};
    font-weight: ${theme.fontWeight.extrabold};
    font-size: 0.75rem;
    text-decoration: none;
    margin-right: 1rem;

    &.active {
      color: ${theme.colors.green};
    }

    :hover {
      transition: .25s;
      color: ${theme.colors.white};
    }

    ${mq("md")} {
      margin-right: 3rem;
      font-size: .875rem;
    }
}
`
);

const Nav = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navigation scroll={scrollPosition} data-testid="nav">
      <NavLink
        className={({ isActive }) => (isActive ? "link active" : "link")}
        to="/"
      >
        Anime List
      </NavLink>

      <NavLink
        className={({ isActive }) => (isActive ? "link active" : "link")}
        to="/collections"
      >
        My Collections
      </NavLink>
    </Navigation>
  );
};

export default Nav;
export { Navigation };
