/**
 *
 * Wrapper Styles
 *
 */

import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { sizes } from "strapi-helper-plugin";

const CloseBtn = styled.button`
  position: absolute;
  right: 0;
  top: 50%;

  background: ${(props) => props.theme.main.colors.strapi["blue-darker"]};
  border-radius: 0 10px 10px 0;
  overflow: hidden;
  height: 60px;
  width: 30px;
  padding: 1px 5px;
  outline: none;
  cursor: pointer;
  transition: 400ms;

  display: flex;
  justify-content: center;
  align-items: center;

  transform: translateX(50%) translateY(-50%);

  @media (min-width: ${sizes.desktop}) {
    display: none;
  }

  &:active {
    transform: translateX(100%) translateY(-50%);
  }

  &::before {
    content: "";
    display: block;
    min-width: 15px;
    min-height: 15px;
    border-radius: 4px;
    color: white;
    border-top: 5px solid;
    border-right: 5px solid;
    transition: 400ms;
    transform: rotateZ(45deg);
  }

  /* --- Change to X icon --- */
  ${({ active }) =>
    active &&
    css`
      transform: translateX(100%) translateY(-50%);
      width: 20px;

      &::before {
        transform: rotateZ(-135deg) rotateY(-360deg);
      }
    `}
`;

CloseBtn.defaultProps = {
  active: false,
  theme: {
    main: {
      colors: {
        strapi: {},
      },
    },
  },
};

CloseBtn.propTypes = {
  active: PropTypes.bool,
  theme: PropTypes.object,
};

export default CloseBtn;
