import React from 'react';
import PropTypes from 'prop-types';
import cntl from 'cntl';

const wrapperStyles = cntl`
  text-2xl
  font-bold
  mb-4
  text-slate-100
  text-shadow
`;

const Header = ({ logEntries, title }) => {
  const count = logEntries && logEntries.length ? logEntries.length : '0';

  // Show custom title if defined
  if (title) {
    return  (
      <div className={wrapperStyles}>{title}</div>
    );
  }

  return (
    <>
      <div className={wrapperStyles}>Travel Note</div>
      <p className="text-base text-slate-200 mb-2">
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
  title: PropTypes.string,
};

export default Header;
