import React from 'react';
import { Router, Redirect } from '@reach/router';

import './App.css';
import { UserProvider } from './hooks';

import AuthForm from './components/AuthForm';
import NotFound from './components/NotFound';
import Home from './components/Home';
import PageLoading from './components/PageLoading';
import Map from './components/Map';
import Settings from './components/Settings';

const Logs = () => <div>list</div>;

const App = () => (
  <UserProvider>
    <PageLoading>
      <Router>
        {/* 404 route */}
        <NotFound default />
        <Redirect from="/" to="/map" noThrow />

        {/* Auth routes */}
        <AuthForm path="/login" />
        <AuthForm path="/signup" />

        {/* Main app routes */}
        <Home path="/">
          <Settings path="/settings" />
          <Logs path="/logs" />
          <Map path="/:id" />
        </Home>

      </Router>
    </PageLoading>
  </UserProvider>
);
export default App;
