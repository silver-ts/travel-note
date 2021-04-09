import React, { useState, useEffect, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { checkRefreshToken } from '../api';

const UserContext = createContext(null);

// Create and handle user state
const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user exists
    const checkUser = async () => {
      axios.defaults.headers.common['authorization'] = null;

      try {
        const res = await checkRefreshToken();
        setUser(res.data.user.accessToken && res.data.user);

        // Add access Token to the request header
        const accessToken = res.data.user.accessToken;
        axios.defaults.headers.common['authorization'] = accessToken;

      } catch (err) {
        setUser(null);
        axios.defaults.headers.common['authorization'] = null;
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
