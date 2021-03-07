import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';

import { Header } from '../components';

beforeEach(cleanup);

const logEntries = ['1', '2', '3', '4'];

describe('<Header />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show a number of items', () => {
    render(
      <Header logEntries={logEntries} />,
    );

    expect(screen.queryByTestId('number')).toHaveTextContent(4);
  });

  it('should show 0 items when there\'re no entries', () => {
    render(<Header />);

    expect(screen.queryByTestId('number')).toHaveTextContent(0);
  });
});
