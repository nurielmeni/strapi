import React from 'react';
import { Link } from 'react-router-dom';

import Wrapper from './Wrapper';

const LeftMenuHeader = () => (
  <Wrapper>
    <Link to="/" className="leftMenuHeaderLink">
      <span className="projectName">Flash Studies</span>
    </Link>
  </Wrapper>
);

export default LeftMenuHeader;
