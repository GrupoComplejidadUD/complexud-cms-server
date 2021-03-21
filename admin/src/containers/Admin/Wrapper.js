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
    margin-left: 0;
    @media (min-width: ${sizes.desktop}) {
      width: calc(100vw - ${({ theme }) => theme.main.sizes.leftMenu.width});
      margin-left: ${(props) => props.theme.main.sizes.leftMenu.width};
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
