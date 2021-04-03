import React from "react";
import styled from "styled-components";
import { sizes } from "strapi-helper-plugin";

const StyledGrid = styled.div`
  display: grid;
  grid-gap: ${({ gap }) => gap || "2.5rem"};

  @media (min-width: ${sizes.tablet}) {
    grid-template-columns: ${({ templateColumns }) =>
      templateColumns || "1fr 1fr"};
  }
`;

const Grid = ({ children, ...props }) => {
  return <StyledGrid {...props}>{children}</StyledGrid>;
};

export default Grid;
