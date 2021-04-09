import React from 'react';
import { navigate } from '@reach/router';
import { Helmet } from 'react-helmet';

import { logoutUser } from '../api';
import { useAuth } from '../hooks';

import Header from './Header';

const Settings = () => {
  const { setUser, user: { email } } = useAuth();

  const logoutHandler = () => {
    logoutUser();
    setUser(null);

    navigate('/login');
  };

  return (
    <>
      <Helmet title="Settings" />

      <div className="main-wrapper">
        <Header title="Settings" />

        <div className="mt-10">
          <p className="mb-5">{`You are logged in as a ${email}.`}</p>
          <button
            className="btn"
            onClick={logoutHandler}
          >
          Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Settings;
