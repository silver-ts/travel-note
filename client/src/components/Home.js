import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from '@reach/router';

import { useAuth } from '../hooks';
import Navigation from './Navigation';

const Home = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Redirect from="" to="/login" noThrow  />;
  }

  return (
    <>
      <Navigation />

      <main className="ml-20">
        {children}
      </main>
    </>
  );
};

Home.propTypes = {
  children: PropTypes.node,
};

export default Home;
