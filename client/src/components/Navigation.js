import React from 'react';
import { Link } from '@reach/router';

import {
  GithubIcon,
  MapIcon,
  MenuIcon,
  SettingsIcon,
  AddIcon,
  LogoIcon,
} from './icons';

const Navigation = () => (
  <nav className="fixed bottom-0 sm:top-0 sm:left-0 sm:w-20 w-full h-20 sm:h-screen bg-slate-400 flex sm:flex-col justify-between items-center sm:py-10 text-slate-300">
    <Link to="/"><LogoIcon /></Link>
    <div className="flex sm:flex-col justify-center items-center">
      <Link to="/" className="block sm:mb-8 mr-4 sm:mr-0"><MapIcon /></Link>
      <Link to="/logs" className="block sm:mb-8 mr-4 sm:mr-0">
        <MenuIcon />
      </Link>
      <Link to="/settings" className="block sm:mb-8 mr-4 sm:mr-0">
        <SettingsIcon />
      </Link>
      <a href="https://github.com/ryuuto829/journey-log" className="block">
        <GithubIcon />
      </a>
    </div>
    <Link to="/add"><AddIcon /></Link>
  </nav>
);

export default Navigation;
