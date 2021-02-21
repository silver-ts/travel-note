const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/auth');
const { verifyUserAuth } = require('./middleware/auth');

// Require variables from .env file
require('dotenv').config();
const { MONGO_DB_CONNECT, CORS_ORIGIN } = process.env;

const app = express();

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
// Configures the Access-Control-Allow-Origin CORS header
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

// Route middlewares
app.get('/api/test', (req, res) => res.status(200).send({ username: 'Flavio' }));
app.use('/api/user', authRouter);
app.get('/', verifyUserAuth, (req, res) => res.send('main page'));

module.exports = app;
