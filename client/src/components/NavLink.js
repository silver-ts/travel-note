import React from 'react';
import PropTypes from 'prop-types';
import { Link, Match } from '@reach/router';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-toward-subtle.css';

// Style active navigation links
// Read more: https://github.com/reach/router/issues/297
const NavLink = ({ to, children, title }, props) => (
  <Match path={to}>
    {({ match }) => (
      <li className={`nav-link ${match ? 'text-white' : null}`} {...props}>
        <Tippy
          content={title}
          placement="right"
          arrow={true}
          animation='shift-toward-subtle'
        >
          <Link to={to} className="block p-4">{children}</Link>
        </Tippy>
      </li>
    )}
  </Match>
);

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
  title: PropTypes.string,
};

export default NavLink;
