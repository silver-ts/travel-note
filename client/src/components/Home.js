import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from '@reach/router';

import { LogEntriesProvider } from '../hooks';
import { Navigation } from '.';

const Home = ({ children, user }) => {
  // Check user authentication
  if (!user) {
    return <Redirect from="" to="/login" noThrow />;
  }

  return (
    <>
      <Navigation />

      <LogEntriesProvider>
        <main
          data-testid="main"
          className="pl-0 sm:pl-20 w-full relative"
        >
          {children}
        </main>
      </LogEntriesProvider>
    </>
  );
};

Home.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    accessToken: PropTypes.string,
  }),
  children: PropTypes.node,
};

export default Home;
