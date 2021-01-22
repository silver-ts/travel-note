import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const EntryForm = ({ onClose, isOpen }) => {
  const modalRef = useRef();
  const [inputField, setInputField] = useState({});

  // We're using simple approach to capture click outside the modal
  // Read more: https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-with-react-hook-ba77c37c7e82
  const clickOutsideHandler = e => {
    if (modalRef.current.contains(e.target)) {
      return;
    }

    onClose();
  };

  // Close modal on 'ESC'
  const onKeyboardHandler = e => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  // Setup listeners when modal is open
  useEffect(() => {
    const removeListeners = () => {
      document.removeEventListener('mousedown', clickOutsideHandler);
      document.removeEventListener('keydown', onKeyboardHandler);
    };

    if (isOpen) {
      document.addEventListener('mousedown', clickOutsideHandler);
      document.addEventListener('keydown', onKeyboardHandler);
    } else {
      removeListeners();
    }

    return () => {
      removeListeners();
    };
    // eslint-disable-next-line react-app/react-hooks/exhaustive-deps
  }, [isOpen]);

  // Controlled inputs values
  const onChangeInputHandler = e => {
    const value = e.target.value;
    const name = e.target.name;

    setInputField({ ...inputField, [name]: value });
  };

  const submitEntryHandler = e => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <>
      <div
        ref={modalRef}
        className="container fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-5 py-10 bg-gray-800 text-gray-50 max-w-screen-sm z-50 m-auto transform rounded">
        <h1 className="text-center text-xl mt-2 mb-5">
          <span role="img" aria-label="Add new entry" aria-hidden="true">
            ✨
          </span>
          Add new entry !
        </h1>
        <form className="flex flex-col" onSubmit={submitEntryHandler}>
          <label htmlFor="title" className="input-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={inputField.title}
            onChange={onChangeInputHandler}
            className="input-field"
            autoComplete="off"
            placeholder="San Francisco, .."
          />
          <label htmlFor="date" className="input-label">
            Date
          </label>
          <input type="date" id="date" name="date" className="input-field" />
          <label htmlFor="comment" className="input-label">
            Comment
          </label>
          <input
            type="text"
            id="comment"
            name="comment"
            value={inputField.comment}
            onChange={onChangeInputHandler}
            className="input-field"
            autoComplete="off"
            placeholder="Your comment here .."
          />
          <label htmlFor="image" className="input-label">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg"
            className="input-field"
            multiple="multiple"
          />
          <button className="bg-red-400 p-2 mt-5 rounded hover:opacity-90 transition-all">
            <span className="text-xl text-gray-50">Create Entry</span>
          </button>
        </form>
        <button
          onClick={onClose}
          className="close-btn block absolute right-5 top-5 w-10 h-10 opacity-25 hover:opacity-100"></button>
      </div>
    </>
  );
};

EntryForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default EntryForm;
