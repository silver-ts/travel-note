import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from '@reach/router';

import { useAuth } from '../hooks';
import Navigation from './Navigation';
import { LogEntriesProvider } from '../hooks/useLog';

const Home = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Redirect from="" to="/login" noThrow  />;
  }

  return (
    <>
      <Navigation />

      <LogEntriesProvider>
        <main className="pl-20 w-full">
          {children}
        </main>
      </LogEntriesProvider>
    </>
  );
};

Home.propTypes = {
  children: PropTypes.node,
};

export default Home;