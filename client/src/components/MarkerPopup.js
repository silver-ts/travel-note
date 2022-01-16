import React from 'react';
import PropTypes from 'prop-types';
import { localeDate } from '../utils';

const MarkerPopup = ({ title, visitDate, country, clicked }) => (
  <div className="z-30 text-white pl-2 pr-8">
    <h3 className="text-2xl mb-2 font-light">{title}</h3>
    <p className="text-base text-slate-200 mb-4">
      {`${localeDate(visitDate)} - ${country}`}
    </p>
    <button
      className="btn text-base font-bold"
      onClick={clicked}>
      Read more
    </button>
  </div>
);

MarkerPopup.propTypes = {
  title: PropTypes.string.isRequired,
  visitDate: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired,
};

export default MarkerPopup;
