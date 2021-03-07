import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AuthForm } from '../components';

beforeEach(cleanup);

jest.mock('../hooks', () => ({
  useAuth: () => ({
    user: null,
    setUser: jest.fn(),
  }),
}),
);

jest.mock('../api', () => ({
  loginUser: () => ({
    data: {
      user: {
        id: 'user-id', accessToken: 'token',
      },
    },
  }),
  registerUser: () => ({
    data: {
      user: {
        id: 'user-id', accessToken: 'token',
      },
    },
  }),
}));

describe('<AuthForm />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const user = { id: 'user-id', accessToken: 'token' };
  const setUser = jest.fn();

  it('renders the <AuthForm /> with login form', () => {
    const { queryByTestId } = render(
      <AuthForm path="/login" setUser={setUser} />,
    );

    expect(queryByTestId('authForm')).toBeTruthy();
  });

  it('renders the <AuthForm /> with register form', () => {
    const { queryByTestId } = render(
      <AuthForm path="/signup" setUser={setUser} />,
    );

    expect(queryByTestId('authForm')).toBeTruthy();
  });

  it('doesn\'t render the <AuthForm /> if user exists', () => {
    const { queryByTestId } = render(
      <AuthForm path="/login" user={user} setUser={setUser} />,
    );

    expect(queryByTestId('authForm')).toBeFalsy();
  });

  it('redirect to main page on login success', async () => {
    const { queryByTestId } = render(
      <AuthForm path="/login" setUser={setUser} />,
    );

    await userEvent.click(queryByTestId('submit'));
    expect(setUser).toHaveBeenCalled();
  });

  it('redirect to main page on register success', async () => {
    const { queryByTestId } = render(
      <AuthForm path="/register" setUser={setUser} />,
    );

    await userEvent.click(queryByTestId('submit'));
    expect(setUser).toHaveBeenCalled();
  });
});
