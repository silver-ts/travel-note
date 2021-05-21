import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import cntl from 'cntl';

import { createLogEntry, updateLogEntry, deleteLogEntry } from '../api';
import { useLogEntries, useAuth, useKeypress } from '../hooks';
import { localeDate, formattedDate } from '../utils';
import s from '../settings';

import { CloseIcon } from './icons';
import { notifySuccess, notifyFailure } from './Notify';
import { LogMenu } from '.';

const sectionWrapperStyles = cntl`
  w-full
  absolute
  top-0
  sm:right-0
  h-screen
  left-auto
  bottom-auto
  bg-slate-400
  px-6
  sm:px-12
  pt-20
  sm:pt-32
  pb-12
  sm:w-101
  overflow-x-hidden
  z-40
  overflow-y-auto
  slide
`;

const closeBtnStyles = cntl`
  absolute
  top-6
  left-6
  sm:left-12
  flex
  items-center
  hover:text-white
  text-slate-300
  transition-all
`;

const LogEntry = ({
  isCreate,
  data,
  onClose,
  entryLocation,
  isEdit,
}) => {
  const { user } = useAuth();
  const { getEntries } = useLogEntries();

  // Show edit form when new marker created or clicking menu edit button
  // from the logs page
  const [edit, setEdit] = useState(isCreate || isEdit);

  // Setup inputs and error messages
  const [inputField, setInputField] = useState(data ?
    {
      title: data.title,
      // Format date to the "yyyy-mm-dd" format
      visitDate: formattedDate(data.visitDate),
      content: data.content,
    }
    : {
      title: '',
      visitDate: '',
      content: '',
    });

  // Setup characters limit for inputs
  const [charCount, setCharCount] = useState(data ?
    {
      title: data.title.length,
      content: data.content.length,
    }
    : {
      title: 0,
      content: 0,
    });

  const submitLogHandler = async e => {
    e.preventDefault();

    if (isCreate) {
    // Save entry to the database
      try {
        await createLogEntry({
          title: inputField.title,
          visitDate: inputField.visitDate,
          content: inputField.content,
          location: {
            ...entryLocation,
            type: 'Point',
          },
        });

        notifySuccess('Successfully saved.');
        navigate('/map');
        onClose();

        await getEntries();
      } catch (err) {
        notifyFailure('Can\'t save right now.');
      }
    } else {
      try {
        await updateLogEntry(data._id, {
          title: inputField.title,
          visitDate: inputField.visitDate,
          content: inputField.content,
        });

        notifySuccess('Log entry was updated.');
        await getEntries();
        setEdit(false);
      } catch (err) {
        notifyFailure('Can\'t update right now.');
      }
    }
  };

  const deleteLogHandler = async () => {
    try {
      await deleteLogEntry(data._id);

      notifySuccess('Log entry was deleted.');
      await getEntries();

      navigate('/map');
    } catch (err) {
      notifyFailure('Can\'t delete right now.');
    }
  };

  // Controlled inputs values
  const onChangeInputHandler = e => {
    const value = e.target.value;
    const name = e.target.name;
    const hasCharLimit = Object.keys(charCount).includes(name);

    if (hasCharLimit) {
      setCharCount({ ...charCount, [name]: value.length });
    }

    setInputField({ ...inputField, [name]: value });
  };

  const cancelFormHandler = () => {
    if (isCreate) {
      onClose();
    }

    setEdit(false);
  };

  const editLogHandler = () => {
    setEdit(true);
    setInputField({
      title: data.title,
      // Format date to the "yyyy-mm-dd" format
      visitDate: formattedDate(data.visitDate),
      content: data.content,
    });
  };

  // Close window on ESC
  useKeypress('Escape', () => {
    cancelFormHandler();
    navigate('/map');
  });

  if (edit) {
    return (
      <section className={sectionWrapperStyles}>
        <div className="circle"></div>

        <form className="flex flex-col" onSubmit={submitLogHandler}>
          <label htmlFor="title" className="mb-3">Title</label>
          <input
            type="text"
            name="title"
            className="input mb-2"
            maxLength={s.TITLE_CHAR_LIMIT}
            required
            value={inputField.title}
            onChange={onChangeInputHandler} />
          <p className="text-right text-base">
            {`${charCount.title}/${s.TITLE_CHAR_LIMIT}`}
          </p>

          <label htmlFor="visitDate" className="mb-3">Visit date</label>
          <input
            type="date"
            name="visitDate"
            className="input mb-8"
            required
            value={inputField.visitDate}
            onChange={onChangeInputHandler} />

          <label htmlFor="content" className="mb-3">Content</label>
          <textarea
            name="content"
            className="input mb-2 h-100 whitespace-pre-line"
            rows="10"
            required
            maxLength={s.CONTENT_CHAR_LIMIT}
            value={inputField.content}
            onChange={onChangeInputHandler} />
          <p className="text-right text-base">
            {`${charCount.content}/${s.CONTENT_CHAR_LIMIT}`}
          </p>

          <div className="flex items-center mb-12">
            <button className="btn my-3">Submit</button>
            <button className="ml-5" onClick={cancelFormHandler}>Cancel</button>
          </div>
        </form>
      </section>
    );
  }

  return (
    <section className={sectionWrapperStyles}>
      <button
        className={closeBtnStyles}
        onClick={() => navigate('/map')}
      >
        <CloseIcon />
        <p className="ml-2 text-base font-bold">Close - ESC</p>
      </button>

      <div className="circle"></div>

      <div className="divide-y divide-slate-300">
        <header className="flex justify-between items-center pb-5 text-4xl">
          <h2 className="text-slate-100 break-words overflow-hidden">
            {data && data.title}
          </h2>
          <LogMenu
            deleteLogHandler={deleteLogHandler}
            editLogHandler={editLogHandler} />
        </header>
        <div>
          <p className="pt-5 mb-10 text-slate-200 whitespace-pre-line">
            {data && data.content}
          </p>
          <footer className="text-slate-300 text-base">
            <p className="mb-1">
              <span className="font-bold">
                {data &&
                 data.location.place ? `${data.location.place}, ` : null}
                {data && data.location.country}
              </span>
            </p>
            <p className="mb-1">Visited date:{' '}
              <span className="font-bold">
                {data && localeDate(data.visitDate)}
              </span>
            </p>
            <p>Created by:{' '}
              <span className="font-bold">
                {user && user.email}
              </span>
            </p>
          </footer>
        </div>
      </div>
    </section>
  );
};

LogEntry.propTypes = {
  isCreate: PropTypes.bool,
  isEdit: PropTypes.bool,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    visitDate: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
  }),
  onClose: PropTypes.func,
  entryLocation: PropTypes.shape({
    country: PropTypes.string,
    place: PropTypes.string,
    coordinates: PropTypes.array.isRequired,
  }),
};

export default LogEntry;
