import React from 'react';
import { navigate } from '@reach/router';
import { Helmet } from 'react-helmet';

import { logoutUser } from '../api';
import { useAuth } from '../hooks';

const Settings = () => {
  const { setUser } = useAuth();

  const logoutHandler = () => {
    logoutUser();
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      <Helmet title="Settings" />

      <p>Settings page here !</p>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
};

export default Settings;
