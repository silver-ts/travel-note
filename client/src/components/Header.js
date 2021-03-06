import React from 'react';
import PropTypes from 'prop-types';

import { useLogEntries } from '../hooks';

const Header = () => {
  const { logEntries } = useLogEntries();

  return (
    <>
      <div className="text-2xl font-bold mb-4 text-slate-100 text-shadow">Journey Log</div>
      <p className="text-base text-slate-200">
        Collection of{' '}
        <span className="text-slate-100">{logEntries.length}</span>{' '}
        log entries
      </p>
    </>
  );
};

Header.propTypes = {
  // children: PropTypes.node,
};

export default Header;
