/**
 *
 * LeftMenuFooter
 *
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import Wrapper, { A } from './Wrapper';

function LeftMenuFooter({ version }) {
  // PROJECT_TYPE is an env variable defined in the webpack config
  // eslint-disable-next-line no-undef
  const projectType = PROJECT_TYPE;

  return (
    <Wrapper>
      <div className="poweredBy">
        <span>Powered By</span>&nbsp;
        <A
          key="website"
          href="https://thetalms.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          ThetaLMS
        </A>
      </div>
    </Wrapper>
  );
}

LeftMenuFooter.propTypes = {
  version: PropTypes.string.isRequired
};

export default LeftMenuFooter;
