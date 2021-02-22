import React from 'react';
import { Redirect, navigate } from '@reach/router';

import { logoutUser } from '../api/user';
import { useAuth } from '../hooks';

const Home = () => {
  const { user, setUser } = useAuth();

  if (!user) {
    return <Redirect from="" to="/login" noThrow  />;
  }

  const logoutHandler = () => {
    logoutUser();
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      <div>Main content here !</div>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
};

export default Home;
