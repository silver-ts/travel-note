import React from 'react';
import { Router, Redirect } from '@reach/router';
import { Toaster } from 'react-hot-toast';

import { UserProvider } from '../hooks';
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

const App = () => (
  <>
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
            <EntriesList path="/logs" />
            <Map path="/:id" />
          </Home>

        </Router>
      </PageLoading>
    </UserProvider>

    {/* Popup notifications */}
    <Toaster />
  </>
);
export default App;
