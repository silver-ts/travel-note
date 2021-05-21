import React from 'react';

// Loader from https://loading.io/css/
const Loading = () => (
  <div className="flex justify-center items-center h-screen w-full">
    <div className="inline w-20 h-20 relative">
      <div className="loader-circles"></div>
      <div className="loader-circles"></div>
    </div>
  </div>
);

export default Loading;
