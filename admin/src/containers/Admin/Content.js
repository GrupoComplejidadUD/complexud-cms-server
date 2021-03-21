import styled from "styled-components";
import PropTypes from "prop-types";

const Content = styled.div`
  min-height: calc(100vh - ${(props) => props.theme.main.sizes.header.height});
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
