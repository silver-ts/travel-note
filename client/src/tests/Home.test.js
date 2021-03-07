import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { Home } from '../components';

beforeEach(cleanup);

jest.mock('../hooks', () => ({
  LogEntriesProvider: ({ children }) => <div>{children}</div>,
}),
);
describe('<Home />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const user = { id: 'user-id', accessToken: 'token' };

  it('renders the <Home /> if user exists', () => {
    const { queryByTestId } = render(
      <Home user={user}>
        <div>content</div>
      </Home>,
    );

    expect(queryByTestId('main')).toBeTruthy();
  });


  it('redirects to the login page user doesn\'t exist', () => {
    const { queryByTestId } = render(
      <Home user={null}>
        <div>content</div>
      </Home>,
    );

    expect(queryByTestId('main')).toBeFalsy();
  });
});
