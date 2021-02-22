import React from 'react';
import { Router } from '@reach/router';

import './App.css';
import { UserProvider } from './hooks';

import AuthForm from './components/AuthForm';
import NotFound from './components/NotFound';
import Home from './components/Home';
import PageLoading from './components/PageLoading';

const App = () => (
  <UserProvider>
    <PageLoading>
      <Router>
        <NotFound default />
        <Home path='/' />
        <AuthForm path="/login" />
        <AuthForm path="/signup" />
      </Router>
    </PageLoading>
  </UserProvider>
);
export default App;
