import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { Map } from '../components';
import { LOG_ENTRIES } from './constants';

beforeEach(cleanup);

jest.mock('@reach/router', () => ({
  ...jest.requireActual('@reach/router'),
  useParams: () => ({
    id: 'map',
  }),
}),
);

jest.mock('../hooks', () => ({
  useLogEntries: () => ({
    logEntries: LOG_ENTRIES,
  }),
}),
);

jest.mock('react-map-gl', () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
}));

describe('<Map />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders map header', () => {
    const { queryByTestId } = render(<Map />);

    expect(queryByTestId('header')).toBeTruthy();
  });
});
