import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';

import { EditIcon } from './icons';

const TITLE_CHAR_LIMIT = 50;
const CONTENT_CHAR_LIMIT = 200;

const LogEntry = ({ isCreate, data }) => {
  const [edit, setEdit] = useState(isCreate);

  // Setup inputs and error messages
  const [inputField, setInputField] = useState({
    title: data && data.title || '',
    date: '',
    content: data && data.content || '',
  });

  // Setup characters limit for inputs
  const [charCount, setCharCount] = useState({
    title: 0,
    content: 0,
  });

  const submitLogHandler = e => {
    e.preventDefault();

    console.log('submit');
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
      navigate('/map');
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
            value={inputField.title}
            onChange={onChangeInputHandler} />
          <p className="text-right text-base">{`${charCount.title}/${TITLE_CHAR_LIMIT}`}</p>

          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            className="input"
            value={inputField.date}
            onChange={onChangeInputHandler} />

          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            className="input"
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
};

export default LogEntry;
