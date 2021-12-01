import React from 'react';
import LogoStrapi from '../../../../assets/images/strapi_logo.png';
import Img from './Img';

const LogoImg = process.env.STRAPI_LOGO || LogoStrapi;
const Organization = process.env.STRAPI_ORGANIZATION || 'Theta LMS';

const Logo = () => (
  <div>
    <Img src={LogoImg} alt="strapi-logo" style={{marginRight: 20}} />
    <span>{Organization}</span>
  </div>
);

export default Logo;
