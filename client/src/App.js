import React from 'react';
import { Router } from '@reach/router';

import './App.css';

import AuthForm from './components/AuthForm';
import NotFound from './components/NotFound';
import Home from './components/Home';

import { UserProvider } from './hooks/useAuth';

const App = () => (
  <UserProvider>
    <Router>
      <NotFound default />
      <Home path='/' />
      <AuthForm path="/login" />
      <AuthForm path="/signup" />
    </Router>
  </UserProvider>
);
export default App;
