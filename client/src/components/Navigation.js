import React from 'react';
import { Link } from '@reach/router';
import cntl from 'cntl';

import {
  GithubIcon,
  MapIcon,
  MenuIcon,
  SettingsIcon,
  LogoIcon,
} from './icons';
import { NavLink } from '.';

const navbarStyles = cntl`
  fixed
  bottom-0
  sm:top-0
  sm:left-0
  sm:w-20
  sm:w-20
  w-full
  h-16
  sm:h-screen
  bg-slate-400
  flex
  sm:flex-col
  sm:justify-between
  justify-center
  items-center
  sm:py-10
  text-slate-300
  z-50
`;

const Navigation = () => (
  <nav className={navbarStyles}>
    <Link
      to="/"
      className="hover:text-white transition-all hidden sm:block"
    >
      <LogoIcon />
    </Link>
    <ul className="flex sm:flex-col justify-center items-center">
      <NavLink to="/map" className="nav-link" title="Map"><MapIcon /></NavLink>
      <NavLink to="/logs" className="nav-link" title="Log Entries">
        <MenuIcon />
      </NavLink>
      <NavLink to="/settings" className="nav-link" title="Settings">
        <SettingsIcon />
      </NavLink>
    </ul>
    <a
      href="https://github.com/ryuuto829/journey-log"
      target="_blank"
      rel="noreferrer noopener "
      className="hover:text-white transition-all hidden sm:block">
      <GithubIcon />
    </a>
  </nav>
);

export default Navigation;
