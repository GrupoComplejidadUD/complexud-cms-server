/**
 *
 * Wrapper Styles
 *
 */

import styled from "styled-components";
import { sizes } from "strapi-helper-plugin";

export const OpenMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 6rem;
  height: 100vh;

  @media (min-width: ${sizes.desktop}) {
    display: none;
  }
`;

export const CloseMenu = styled.div`
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: #00000020;

  @media (min-width: ${sizes.desktop}) {
    display: none;
  }
`;
