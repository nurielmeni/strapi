import React from 'react';
import { Link } from 'react-router-dom';

import Wrapper from './Wrapper';

const Organization = process.env.STRAPI_ORGANIZATION || 'Theta LMS';

const LeftMenuHeader = () => (
  <Wrapper>
    <Link to="/" className="leftMenuHeaderLink">
      <span className="projectName">{Organization}</span>
    </Link>
  </Wrapper>
);

export default LeftMenuHeader;
