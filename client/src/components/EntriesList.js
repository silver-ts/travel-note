import React from 'react';
import { Helmet } from 'react-helmet';

import { useLogEntries } from '../hooks';
import Header from './Header';

const EntriesList = () => {
  // Get list of markers from database
  const { logEntries } = useLogEntries();

  return (
    <>
      <Helmet title="Log Entries" />

      <div className="p-10 pl-12">

        <Header logEntries={logEntries} />
      </div>
    </>
  );
};

export default EntriesList;
