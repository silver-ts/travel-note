import React from 'react';
import { Link } from '@reach/router';
import cntl from 'cntl';

const wrapperStyles = cntl`
  flex
  flex-col
  items-center
  justify-center
  w-full
  h-screen
  p-6
`;

const NotFound = () => (
  <div className={wrapperStyles}>
    <p className="text-5xl font-light text-center">404 - PAGE NOT FOUND</p>
    <p className="mt-10 max-w-screen-sm text-center text-base">
      The page you were looking for could not be found. It might have been removed, renamed, or did not exist in the first place.
    </p>
    <Link className="btn mt-10" to="/">Go home</Link>
  </div>
);

export default NotFound;
