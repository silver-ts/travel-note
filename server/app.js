const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const { verifyUserAuth } = require('./middleware/auth');

// Require variables from .env file
require('dotenv').config();
const { MONGO_DB_CONNECT } = process.env;

const app = express();

// Set up mongoose connection
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(MONGO_DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Route middlewares
app.use('/user', authRouter);
app.use('/', verifyUserAuth, (req, res) => res.send('main page'));

module.exports = app;
