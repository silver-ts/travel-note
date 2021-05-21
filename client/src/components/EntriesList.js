import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, navigate } from '@reach/router';
import cntl from 'cntl';

import { deleteLogEntry } from '../api';
import { useLogEntries } from '../hooks';
import { localeDate, SORT_VALUES, sortListBy } from '../utils';

import { notifySuccess, notifyFailure } from './Notify';
import { Header, LogMenu, SortBy } from '.';

const sectionWrapperStyles = cntl`
  grid
  auto-cols-fr
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  gap-6 mt-5
  sm:mt-10
  max-w-screen-2xl
  mx-auto
`;

const titleStyles = cntl`
  text-white
  bold
  text-2xl
  truncate
  overflow-hidden
`;

const EntriesList = () => {
  // Get list of markers from database
  const { logEntries, getEntries } = useLogEntries();

  // Find default sorting option
  const defaultSorting = SORT_VALUES.filter(el => el.default)[0].name;
  const [sorting, setSorting] = useState(defaultSorting);

  const sortedLogEntries = useMemo(() => (
    sortListBy(logEntries, sorting)),
  [logEntries, sorting]);

  // Open current log page details in sidebar
  const editLogHandler = id => {
    navigate(`/${id}`, { state: { isEdit: true } });
  };

  const deleteLogHandler = async id => {
    try {
      await deleteLogEntry(id);

      notifySuccess('Log entry was deleted.');
      await getEntries();

    } catch (err) {
      notifyFailure('Can\'t delete right now.');
    }
  };

  return (
    <>
      <Helmet title="Log Entries" />

      <div className="main-wrapper">
        <Header logEntries={logEntries} />
        <SortBy
          onSortChangeHandler={setSorting}
          sortingValues={SORT_VALUES.map(values => values.name)}
          currentValue={sorting} />

        {!sortedLogEntries.length > 0
            && <p className="mt-10 text-center">
              No log entries found. Try to add a new one on the map!
            </p>}

        <section className={sectionWrapperStyles}>
          {sortedLogEntries && sortedLogEntries.map((log, i) => {
            const { title, location: { country }, visitDate, _id } = log;

            return (
              <article key={i} className="bg-almostBlack-200 p-6 rounded">
                <div className="flex justify-between">
                  <p>{localeDate(visitDate)}</p>
                  <LogMenu
                    editLogHandler={() => editLogHandler(_id)}
                    deleteLogHandler={() => deleteLogHandler(_id)}
                  />
                </div>
                <div className="mt-16 list-ornament">
                  <Link to={`/${_id}`}>
                    <p className="text-slate-200 text-base">{country}</p>
                    <h3 className={titleStyles}>{title}</h3>
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default EntriesList;
