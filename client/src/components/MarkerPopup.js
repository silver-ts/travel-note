import React from 'react';
import PropTypes from 'prop-types';

const MarkerPopup = ({ title, content }) => (
  <div className="z-50">
    <h3>{title}</h3>
    <p>{content}</p>
  </div>
);

MarkerPopup.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default MarkerPopup;
