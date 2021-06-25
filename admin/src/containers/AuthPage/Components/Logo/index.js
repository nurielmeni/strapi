import React from 'react';
import LogoStrapi from '../../../../assets/images/siteLogo__icon-children.png';
import Img from './Img';

const Logo = () => (
  <div>
    <Img src={LogoStrapi} alt="strapi-logo" />
    <span>FLASH Studies</span>
  </div>
);

export default Logo;
