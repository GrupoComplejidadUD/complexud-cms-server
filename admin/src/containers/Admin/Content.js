import styled from "styled-components";
import PropTypes from "prop-types";
import { sizes } from "strapi-helper-plugin";

const Content = styled.div`
  min-height: calc(100vh - ${(props) => props.theme.main.sizes.header.height});
  width: 100%;
  margin-top: ${(props) => props.theme.main.sizes.header.height};
  margin-left: 0;

  @media (min-width: ${sizes.desktop}) {
    width: calc(100vw - ${(props) => props.theme.main.sizes.leftMenu.width});
    margin-left: ${(props) => props.theme.main.sizes.leftMenu.width};
  }

  background: ${(props) => props.theme.main.colors.content["background-alpha"]};
`;

Content.defaultProps = {
  theme: {
    main: {
      colors: {
        content: {},
      },
      sizes: {
        header: {},
        leftMenu: {},
      },
    },
  },
};

Content.propTypes = {
  theme: PropTypes.object,
};

export default Content;
