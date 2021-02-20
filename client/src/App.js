import React from 'react';
import { Router } from '@reach/router';
import './App.css';

import AuthForm from './components/AuthForm';

const App = () => (
  <Router>
    <AuthForm path="/login" />
    <AuthForm path="/signup" />
  </Router>
);
export default App;
