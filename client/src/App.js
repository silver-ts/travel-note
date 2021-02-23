import React from 'react';
import { Router } from '@reach/router';

import './App.css';
import { UserProvider } from './hooks';

import AuthForm from './components/AuthForm';
import NotFound from './components/NotFound';
import Home from './components/Home';
import PageLoading from './components/PageLoading';
import Map from './components/Map';
import Settings from './components/Settings';

const App = () => (
  <UserProvider>
    <PageLoading>
      <Router>
        {/* 404 route */}
        <NotFound default />

        {/* Auth routes */}
        <AuthForm path="/login" />
        <AuthForm path="/signup" />

        {/* Main app routes */}
        <Home path="/">
          <Map path="/" />
          <Settings path="/settings" />
        </Home>

      </Router>
    </PageLoading>
  </UserProvider>
);
export default App;
