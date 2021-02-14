const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');

// Require variables from .env file
require('dotenv').config();
const { MONGO_DB_CONNECT } = process.env;

const app = express();

// Set up mongoose connection
mongoose.connect(MONGO_DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware for parsing JSON requests
app.use(express.json());

// Route middlewares
app.use('/api/user', authRouter);

module.exports = app;
