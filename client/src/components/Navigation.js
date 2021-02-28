import React from 'react';
import { Link } from '@reach/router';

import {
  GithubIcon,
  MapIcon,
  MenuIcon,
  SettingsIcon,
  LogoIcon,
} from './icons';
import NavLink from './NavLink';

const Navigation = () => (
  <nav className="fixed bottom-0 sm:top-0 sm:left-0 sm:w-20 w-full h-20 sm:h-screen bg-slate-400 flex sm:flex-col justify-between items-center sm:py-10 text-slate-300">
    <Link to="/" className="block hover:text-white transition-all"><LogoIcon /></Link>
    <ul className="flex sm:flex-col justify-center items-center">
      <NavLink to="/map" className="nav-link"><MapIcon /></NavLink>
      <NavLink to="/logs" className="nav-link">
        <MenuIcon />
      </NavLink>
      <NavLink to="/settings" className="nav-link">
        <SettingsIcon />
      </NavLink>
    </ul>
    <a
      href="https://github.com/ryuuto829/journey-log"
      target="_blank"
      rel="noreferrer noopener "
      className="block hover:text-white transition-all">
      <GithubIcon />
    </a>
  </nav>
);

export default Navigation;
