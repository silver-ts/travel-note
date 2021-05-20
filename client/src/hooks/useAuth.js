import React, { useState, useEffect, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { checkRefreshToken } from '../api';

const UserContext = createContext(null);

// Create and handle user state
const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Send request to refresh JWT token after time in ms
  const refreshTokenOnExpire = expireTime => {
    // If token expires in 10m, then send request after 5m,
    // interval can't be shorter than 2 min
    const refreshInterval = expireTime / 2 < 100000 || 120000 ;

    return setInterval(() => checkRefreshToken(), refreshInterval);
  };

  // Update headers each time user data changes,
  // to be able to get logs after login / signin
  useEffect(() => {
    const accessToken = user?.accessToken;

    if (accessToken) {
      axios.defaults.headers.common['authorization'] = accessToken;
    }
  }, [user]);

  useEffect(() => {
    // Check if user exists
    const checkUser = async () => {
      let refreshTimer;

      axios.defaults.headers.common['authorization'] = null;

      try {
        const res = await checkRefreshToken();
        setUser(res.data.user.accessToken && res.data.user);

        refreshTimer = refreshTokenOnExpire(res.data.user.expires);

        // Add access Token to the request header
        const accessToken = res.data.user.accessToken;
        axios.defaults.headers.common['authorization'] = accessToken;

      } catch (err) {
        setUser(null);
        axios.defaults.headers.common['authorization'] = null;
        clearInterval(refreshTimer);
      }

      setLoading(false);
    };

    // Call async function inside useEffect
    checkUser();
  }, []);

  return { user, setUser, loading };
};

// Provider component that wraps app and pass auth object to the context
const UserProvider = ({ children }) => {
  const auth = useAuthProvider();

  return (
    <UserContext.Provider value={auth}>
      {children}
    </UserContext.Provider>
  );
};

// Get auth object from the child component
const useAuth = () => useContext(UserContext);

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useAuth, UserProvider };
