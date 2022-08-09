import React from 'react';
import { Router, Redirect } from '@reach/router';
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

import { useAuth } from '../hooks';
import '../styles/App.css';

import {
  AuthForm,
  NotFound,
  Home,
  PageLoading,
  Map,
  Settings,
  EntriesList,
} from '.';

const App = () => {
  const { user, setUser } = useAuth();

  return (
    <>
      <Helmet titleTemplate="%s | Travel Note" defaultTitle="Travel Note" />

      <PageLoading>
        <Router>
          {/* 404 route */}
          <NotFound default />
          <Redirect from="/" to="/map" noThrow />

          {/* Auth routes */}
          <AuthForm path="/login" user={user} setUser={setUser} />
          <AuthForm path="/signup" user={user} setUser={setUser} />

          {/* Main app routes */}
          <Home path="/" user={user}>
            <Settings path="/settings" />
            <EntriesList path="/logs" />
            <Map path="/:id" />
            <NotFound default />
          </Home>

        </Router>
      </PageLoading>

      {/* Popup notifications */}
      <Toaster />
    </>
  );
};
export default App;
