import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ logEntries }) => {
  const count = logEntries && logEntries.length ? logEntries.length : '0';

  return (
    <>
      <div className="text-2xl font-bold mb-4 text-slate-100 text-shadow">Journey Log</div>
      <p className="text-base text-slate-200">
          Collection of{' '}
        <span data-testid="number" className="text-slate-100">
          {count}
        </span>
        {' '}log entries
      </p>
    </>
  );
};

Header.propTypes = {
  logEntries: PropTypes.array,
};

export default Header;
