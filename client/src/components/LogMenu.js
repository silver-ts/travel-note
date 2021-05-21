import React from 'react';
import PropTypes from 'prop-types';
import cntl from 'cntl';

import {
  Menu,
  MenuItem,
  MenuButton,
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { EditIcon } from './icons';

const buttonStyles = cntl`
  bg-transparent
  text-slate-100
  hover:bg-slate-400
`;

const LogMenu = ({ editLogHandler, deleteLogHandler }) => (
  <div>
    <Menu
      className="bg-slate-400 text-slate-100"
      menuButton={
        <MenuButton className={buttonStyles}>
          <EditIcon />
        </MenuButton>
      }>
      <MenuItem
        className="bg-slate-400 text-slate-100 hover:bg-slate-300 rounded-md"
        onClick={editLogHandler}>Edit</MenuItem>
      <MenuItem
        className="bg-slate-400 text-slate-100 hover:bg-salmon rounded-md"
        onClick={deleteLogHandler}>Delete</MenuItem>
    </Menu>
  </div>
);

LogMenu.propTypes = {
  editLogHandler: PropTypes.func.isRequired,
  deleteLogHandler: PropTypes.func.isRequired,
};

export default LogMenu;
