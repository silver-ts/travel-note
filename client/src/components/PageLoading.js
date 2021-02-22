import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks';
import Loading from './Loading';

const PageLoading = ({ children }) => {
  const { loading } = useAuth();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // We'll set minimum loading duration to avoid flickering
    const timer = setTimeout(() => setShowLoader(false), 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Show loader when cheking user auth
  if (loading || showLoader) {
    return <Loading />;
  }

  return children;
};

PageLoading.propTypes = {
  children: PropTypes.node,
};

export default PageLoading;
