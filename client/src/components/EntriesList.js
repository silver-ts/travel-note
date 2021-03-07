import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

const EntriesList = () => (
  <>
    <div className="p-10 pl-12">

      <Header logEntries={null} />
    </div>
  </>
);

EntriesList.propTypes = {
  // children: PropTypes.node,
};

export default EntriesList;
