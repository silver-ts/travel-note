import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, navigate } from '@reach/router';

import { deleteLogEntry } from '../api';
import { useLogEntries } from '../hooks';
import Header from './Header';
import { localeDate, SORT_VALUES, sortListBy } from '../utils';
import { notifySuccess, notifyFailure } from './Notify';

import LogMenu from './LogMenu';
import SortBy from './SortBy';

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

        <section className="grid grid-cols-4 gap-6 mt-10">
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
                    <h3 className="text-white bold text-2xl">{title}</h3>
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
