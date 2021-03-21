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
  top: 0;
  right: -3rem;
  height: ${({ theme }) => theme.main.sizes.header.height};
  width: 3rem;
  padding: 1px 5px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 400ms;

  @media (min-width: ${sizes.desktop}) {
    display: none;
  }

  &:before,
  &:after,
  & > div {
    background: ${(props) => props.theme.main.colors.mediumBlue};
    content: "";
    display: block;
    height: 0.4rem;
    margin-bottom: 5px;
    border-radius: 4px;
    transition: 400ms;
  }

  &:after {
    margin-bottom: 0;
  }

  /* --- Change to X icon --- */
  ${({ active }) =>
    active &&
    css`
      transform: translateX(-100%);
      &:before,
      &:after,
      & > div {
        background: #fff;
      }

      &::before {
        margin: 0;
        transform: rotate(135deg);
      }
      &::after {
        transform: rotate(-135deg);
      }
      & > div {
        transform: scale(0);
      }
    `}
`;

CloseBtn.defaultProps = {
  active: false,
  theme: {
    main: {
      sizes: {
        header: {},
      },
    },
  },
};

CloseBtn.propTypes = {
  active: PropTypes.bool,
  theme: PropTypes.object,
};

export default CloseBtn;
