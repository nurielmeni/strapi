/**
 *
 * LeftMenuFooter
 *
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import { auth, request } from 'strapi-helper-plugin';
import Wrapper, { A } from './Wrapper';

const SUPER_ADMIN_CODE = 'strapi-super-admin';

function LeftMenuFooter({ version }) {
  const [isRunning, setIsRunning] = React.useState(false);
  const [status, setStatus] = React.useState('');

  // PROJECT_TYPE is an env variable defined in the webpack config
  // eslint-disable-next-line no-undef
  const projectType = PROJECT_TYPE;

  const userInfo = auth.getUserInfo() || {};
  const roles = Array.isArray(userInfo.roles)
    ? userInfo.roles
    : userInfo.role
      ? [userInfo.role]
      : [];
  const canRunMaintenance = roles.some(
    (role) => role?.code === SUPER_ADMIN_CODE
  );

  const handleCreateIndexes = async () => {
    if (isRunning) {
      return;
    }

    setIsRunning(true);
    setStatus('Running...');

    try {
      const response = await request('/admin/maintenance/group-indexes', {
        method: 'POST',
        body: { force: false }
      });

      if (response?.skipped) {
        setStatus('Already executed on this instance.');
      } else {
        setStatus(
          `Done: indexes created ${response.createdCount}, existing ${response.alreadyExistsCount}, missing tables ${response.tableMissingCount}; views created/replaced ${response.viewCreatedOrReplacedCount}, views missing tables ${response.viewTableMissingCount}`
        );
      }
    } catch (error) {
      const errorMessage =
        error?.response?.payload?.message || error?.message || 'Request failed';
      setStatus(`Failed: ${errorMessage}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Wrapper>
      {canRunMaintenance ? (
        <div className="maintenanceAction">
          <button
            type="button"
            onClick={handleCreateIndexes}
            disabled={isRunning}
          >
            {isRunning ? 'Creating Indexes...' : 'Create Group Indexes'}
          </button>
          {status ? <small>{status}</small> : null}
        </div>
      ) : null}

      <div className="poweredBy">
        <span>Powered By</span>
        &nbsp;
        <span>&#169;</span>
        {new Date().getFullYear()} &nbsp;
        <A
          key="website"
          href="https://www.thetalms.com"
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
