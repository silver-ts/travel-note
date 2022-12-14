const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');

const authRouter = require('./routes/auth');
const logsRouter = require('./routes/logs');

// Require variables from .env file
require('dotenv').config();
const { MONGO_DB_CONNECT, CORS_ORIGIN } = process.env;

const app = express();

// To solve Heroku error
// Read more: https://www.npmjs.com/package/express-rate-limit#usage
app.enable('trust proxy', 1);

// Set up mongoose connection
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(MONGO_DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
// Configure the Access-Control-Allow-Origin CORS header
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

// Route middlewares
app.use('/api/user', authRouter);
app.use('/api/logs', logsRouter);

module.exports = app;
