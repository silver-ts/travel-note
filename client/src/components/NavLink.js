import React from 'react';
import PropTypes from 'prop-types';
import { Link, Match } from '@reach/router';

// Style active navigation links
// Read more: https://github.com/reach/router/issues/297
const NavLink = ({ to, children }, props) => (
  <Match path={to}>
    {({ match }) => (
      <li className={`nav-link ${match ? 'text-white' : null}`} {...props}>
        <Link to={to}>{children}</Link>
      </li>
    )}
  </Match>
);

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default NavLink;
