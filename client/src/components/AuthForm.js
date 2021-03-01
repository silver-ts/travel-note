import React, { useState } from 'react';
import { Link, navigate, Redirect, useLocation } from '@reach/router';

import { registerUser, loginUser } from '../api';
import { useAuth } from '../hooks';
import { BrandingIcon } from './icons';

const AuthForm = () => {
  const { pathname } = useLocation();
  const isLogin = pathname === '/login';

  const { user, setUser } = useAuth();

  // Setup inputs and error messages
  const [inputField, setInputField] = useState(isLogin
    ? {
      email: 'test@example.com',
      password: 'j5S20m25x1cQ',
    }
    : { email: '', password: '' });
  const [errorMessages, setErrorMessages] = useState(null);

  if (user) {
    return <Redirect from="/login" to="/" noThrow />;
  }

  // Controlled inputs values
  const onChangeInputHandler = e => {
    const value = e.target.value;
    const name = e.target.name;

    setInputField({ ...inputField, [name]: value });
  };

  // Submit form data to the server
  const submitFormHandler = async e => {
    e.preventDefault();
    const { email, password } = inputField;

    try {
      if (isLogin) {
        // Receive user and save it to the local context
        const res = await loginUser(email, password);
        setUser(res.data.user);

      } else {
        // Receive user and save it to the local context
        const res = await registerUser(email, password);
        setUser(res.data.user);
      }

      navigate('/');
    } catch (err) {
      setErrorMessages(err.response.data.errors);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-400 sm:bg-transparent">
        <div className="sm:absolute top-1 sm:top-6 left-6">
          <Link to="/">
            <BrandingIcon />
          </Link>
        </div>
        <div className="sm:p-12 p-6 max-w-md sm:max-w-lg w-full rounded-md bg-slate-400">
          <h1 className="font-light text-slate-100 mb-3 uppercase">
            {isLogin ? 'Login' : 'Sign up'}
          </h1>
          <p className="mb-12">
            {isLogin
              ? 'Sign in to your account to continue'
              : 'Sign up to create a new account'}
          </p>
          <form className="flex flex-col" onSubmit={submitFormHandler}>
            <label htmlFor='email' className="mb-3 text-base">Email address
              {errorMessages && errorMessages.email &&
                <span className="input-error">
                  {errorMessages.email}
                </span>}
            </label>
            <input
              type='text'
              id='email'
              name='email'
              value={inputField.email}
              onChange={onChangeInputHandler}
              required
              className="input mb-6">
            </input>
            <label htmlFor='password' className="mb-3 text-base">Password
              {errorMessages && errorMessages.password &&
                <span className="input-error">
                  {errorMessages.password}
                </span>}
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={inputField.password}
              onChange={onChangeInputHandler}
              required
              className="input mb-10">
            </input>
            <button className="btn mb-8">
              { isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </form>
          <div className="text-base">
            <span>or </span>
            {isLogin
              ? <Link to='/signup'>Create a new account</Link>
              : <Link to='/login'>Log in to your existing account</Link>}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
