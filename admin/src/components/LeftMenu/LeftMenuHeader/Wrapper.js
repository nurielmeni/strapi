import styled from 'styled-components';
import PropTypes from 'prop-types';

import LogoStrapi from '../../../assets/images/strapi_logo.png';
const LogoImg = process.env.STRAPI_LOGO || LogoStrapi;

const Wrapper = styled.div`
  background-color: #007eff;
  padding-left: 2rem;
  height: ${(props) => props.theme.main.sizes.leftMenu.height};

  .leftMenuHeaderLink {
    &:hover {
      text-decoration: none;
    }
  }

  .projectName {
    display: block;
    width: 100%;
    height: ${(props) => props.theme.main.sizes.leftMenu.height};
    font-size: 2rem;
    letter-spacing: 0.2rem;
    color: $white;

    background-image: url(${LogoImg});
    background-repeat: no-repeat;
    background-position: left center;
    background-size: auto 2.5rem;
    line-height: 6rem;
    padding-left: 3.5rem;
    color: #ffffff;
  }
`;

Wrapper.defaultProps = {
  theme: {
    main: {
      colors: {
        leftMenu: {}
      },
      sizes: {
        header: {},
        leftMenu: {}
      }
    }
  }
};

Wrapper.propTypes = {
  theme: PropTypes.object
};

export default Wrapper;
