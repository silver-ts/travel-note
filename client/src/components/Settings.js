import React from 'react';
import { navigate } from '@reach/router';

import { logoutUser } from '../api/user';
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
      <p>Settings page here !</p>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
};

export default Settings;
