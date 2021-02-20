import React, { useState } from 'react';
import { Link, useLocation } from '@reach/router';

import Branding from './icons/Branding';

const AuthForm = () => {
  const { pathname } = useLocation();
  const isLogin = pathname === '/login';

  const [inputField, setInputField] = useState({ email: '', password: '' });

  // Controlled inputs values
  const onChangeInputHandler = e => {
    const value = e.target.value;
    const name = e.target.name;

    setInputField({ ...inputField, [name]: value });
  };

  // Submit form data to the server
  const submitFormHandler = e => {
    e.preventDefault();
  };

  return (
    <>
      <div className="absolute top-1 sm:top-6 left-6">
        <Branding />
      </div>
      <div className="flex justify-center items-center min-h-screen bg-slate-400 sm:bg-transparent">
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
              <span className="input-error">Error message</span>
            </label>
            <input
              type='text'
              id='email'
              name='email'
              value={inputField.email}
              onChange={onChangeInputHandler}
              className="input mb-6">
            </input>
            <label htmlFor='email' className="mb-3 text-base">Password
              <span className="input-error">Error message</span>
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={inputField.password}
              onChange={onChangeInputHandler}
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
