import React from 'react';
import PropTypes from 'prop-types';
import cntl from 'cntl';

import {
  Menu,
  MenuItem,
  MenuButton,
  MenuRadioGroup,
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { SortIcon } from './icons';

const buttonStyles = cntl`
  bg-transparent
  text-slate-100
  hover:bg-slate-400
`;

const SortBy = ({ sortingValues, currentValue, onSortChangeHandler }) => (
  <div className="sm:absolute right-12 top-20">
    <Menu
      className="bg-slate-400 text-slate-100"
      menuButton={
        <MenuButton className={buttonStyles}>
          <div className="flex justify-between items-center">
            <SortIcon />
            <span className="ml-2">Sort by</span>
          </div>
        </MenuButton>
      }>
      <MenuRadioGroup value={currentValue}>
        {sortingValues.map((name, i) => <MenuItem
          key={i}
          className="bg-slate-400 text-slate-100 hover:bg-slate-300 rounded-md"
          value={name}
          onClick={() => onSortChangeHandler(name)}>
          {name}
        </MenuItem>)}
      </MenuRadioGroup>
    </Menu>
  </div>
);

SortBy.propTypes = {
  sortingValues: PropTypes.arrayOf(PropTypes.string.isRequired),
  currentValue: PropTypes.string.isRequired,
  onSortChangeHandler: PropTypes.func.isRequired,
};

export default SortBy;
