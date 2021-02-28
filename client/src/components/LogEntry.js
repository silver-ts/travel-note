import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { EditIcon } from './icons';
import { createLogEntry } from '../api/logs';

const TITLE_CHAR_LIMIT = 50;
const CONTENT_CHAR_LIMIT = 200;

const LogEntry = ({ isCreate, data, onCancel, location }) => {
  const [edit, setEdit] = useState(isCreate);

  // Setup inputs and error messages
  const [inputField, setInputField] = useState(data || {
    title: '',
    visitDate: '',
    content: '',
  });

  // Setup characters limit for inputs
  const [charCount, setCharCount] = useState({
    title: 0,
    content: 0,
  });

  const submitLogHandler = async e => {
    e.preventDefault();

    // Save entry to the database
    try {
      await createLogEntry({
        title: inputField.title,
        visitDate: inputField.visitDate,
        content: inputField.content,
        location: {
          ...location,
          type: 'Point',
        },

      });
    } catch (err) {
      console.log(err);
    }
  };

  // Controlled inputs values
  const onChangeInputHandler = e => {
    const value = e.target.value;
    const name = e.target.name;

    setCharCount({ ...charCount, [name]: value.length });
    setInputField({ ...inputField, [name]: value });
  };

  const cancelFormHandler = () => {
    if (isCreate) {
      onCancel();
    }

    setEdit(false);
  };

  if (edit) {
    return (
      <section className="absolute top-0 right-0 h-screen z-10 left-auto bottom-auto bg-slate-400 px-12 pt-32 pb-12 w-101 overflow-hidden">
        <div className="circle"></div>

        <form className="flex flex-col" onSubmit={submitLogHandler}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            className="input"
            maxLength={TITLE_CHAR_LIMIT}
            value={inputField.title}
            onChange={onChangeInputHandler} />
          <p className="text-right text-base">{`${charCount.title}/${TITLE_CHAR_LIMIT}`}</p>

          <label htmlFor="visitDate">Visit date</label>
          <input
            type="date"
            name="visitDate"
            className="input"
            value={inputField.visitDate}
            onChange={onChangeInputHandler} />

          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            className="input"
            maxLength={CONTENT_CHAR_LIMIT}
            value={inputField.content}
            onChange={onChangeInputHandler} />
          <p className="text-right text-base">{`${charCount.content}/${CONTENT_CHAR_LIMIT}`}</p>

          <div className="flex items-center">
            <button className="btn my-3">Submit</button>
            <button className="ml-5" onClick={cancelFormHandler}>Cancel</button>
          </div>
        </form>
      </section>
    );
  }

  return (
    <section className="absolute top-0 right-0 h-screen z-10 left-auto bottom-auto bg-slate-400 px-12 pt-32 pb-12 w-101 overflow-hidden">
      <div className="circle"></div>
      <header className="flex justify-between items-center pb-5 text-4xl">
        <h2>{data && data.title}</h2>
        <button onClick={() => setEdit(true)}>
          <EditIcon />
        </button>
      </header>
      <div>{data && data.content}</div>
    </section>
  );
};

LogEntry.propTypes = {
  isCreate: PropTypes.bool,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    visitDate: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
  }),
  onCancel: PropTypes.func.isRequired,
  location: PropTypes.shape({
    country: PropTypes.string,
    place: PropTypes.string,
    coordinates: PropTypes.array.isRequired,
  }),
};

export default LogEntry;
