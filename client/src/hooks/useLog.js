import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getLogEntriesList } from '../api';

const LogContext = createContext({});

const useLogs = () => {
  const [logEntries, setLogEntries] = useState([]);

  // Get list of log entries from db
  const getEntries = async () => {
    try {
      const result = await getLogEntriesList();
      await setLogEntries(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    getEntries();
  }, []);

  return { logEntries, getEntries };
};

const LogEntriesProvider = ({ children }) => {
  const logs = useLogs();

  return (
    <LogContext.Provider value={logs}>
      {children}
    </LogContext.Provider>
  );
};

const useLogEntries = () => useContext(LogContext);

LogEntriesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LogEntriesProvider, useLogEntries };
