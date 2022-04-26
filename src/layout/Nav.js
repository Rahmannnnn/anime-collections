import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";

import styled from "@emotion/styled";
import { theme } from "../styles/Theme";
import { mq } from "../styles/Breakpoints";

const Navigation = styled.nav(
  (props) => `
  background: ${props["scroll"] ? theme.colors.black : "transparent"};
  box-shadow: ${props["scroll"] ? "2px -1px 26px rgba(16,22,26,0.75)" : ""};
  
  transition: .25s;
  position: sticky;
  top: 0;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: flex-end;
  z-index: 2;

  .link {
    color: ${theme.colors.lightGray};
    font-weight: ${theme.fontWeight.extrabold};
    font-size: 0.875rem;
    text-decoration: none;

    &.active {
      color: ${theme.colors.green};
    }

    ${mq("md")} {
      font-size: 1rem;
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
    <Navigation scroll={scrollPosition}>
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
