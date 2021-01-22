import React, { useState, useEffect } from 'react';

import Log from './Log';
import Footer from './Footer';
import EntryForm from './EntryForm';

const App = () => {
  const [showModal, setShowModal] = useState(false);

  // Blur content and prevent scrolling when modal is open
  useEffect(() => {
    if (showModal) {
      document.getElementById('content').classList.add('is-blurred');
    } else {
      document.getElementById('content').classList.remove('is-blurred');
    }

    return () => {
      document.body.classList.remove('is-blurred');
    };
  }, [showModal]);

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <EntryForm onClose={closeModalHandler} isOpen={showModal} />
      )}
      <main id="content">
        <button className="flex-1 bg-purple-500" onClick={openModalHandler}>
          Map
        </button>
        <Log />
      </main>
      {/* <Footer /> */}
    </>
  );
};
export default App;
