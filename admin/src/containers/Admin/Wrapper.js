import styled from "styled-components";
import { sizes } from "strapi-helper-plugin";

const Wrapper = styled.div`
  display: flex;
  overflow-x: hidden;
  height: 100vh;

  p,
  span {
    font-family: Lato;
  }

  .adminPageRightWrapper {
    width: 100%;
    @media (min-width: ${sizes.desktop}) {
      width: ${({ theme }) =>
        `calc(100% - ${theme.main.sizes.leftMenu.width})`};
    }
  }
`;

Wrapper.defaultProps = {
  theme: {
    main: {
      sizes: {
        leftMenu: {},
      },
    },
  },
};

export default Wrapper;
