const jwt = require('jsonwebtoken');
const User = require('../models/User');

require('dotenv').config();
const { JWT_TOKEN_SECRET, JWT_TOKEN_EXPIRES_IN } = process.env;
// For cookies convert minutes to milliseconds
const JWT_TOKEN_EXPIRES_IN_MS = JWT_TOKEN_EXPIRES_IN * 60 * 1000;

// Create auth token using JWT
const generateAccessToken = id =>
  jwt.sign({ id }, JWT_TOKEN_SECRET, {
    expiresIn: `${JWT_TOKEN_EXPIRES_IN}m`,
  });

// Format error messages for sending to client UI
const formatErrors = err => {
  const errors = { email: '', password: '' };

  // Check if user email is unique
  if (err.code === 11000) {
    errors.email = 'This email is already in use';
  }

  // Check if user input is valid
  if (err._message === 'user validation failed') {
    Object.values(err.errors).forEach(err => {
      const { path, message } = err.properties;
      errors[path] = message;
    });
  }

  // Check if login email is registered or password is correct
  if (
    err.message === 'incorrect password' ||
    err.message === 'no email found'
  ) {
    const errorMessage = 'Please enter correct email or password';

    errors.password = errorMessage;
    errors.email = errorMessage;
  }

  return { errors };
};

// Sign up controllers
const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create a new user in database
    const user = await User.create({ email, password });

    // Generate a token
    const token = generateAccessToken(user._id);

    // Store jwt token in cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: JWT_TOKEN_EXPIRES_IN_MS,
    });

    res.status(201).send({ user: user._id });
  } catch (err) {
    res.status(400).send(formatErrors(err));
  }
};

const signup_get = (req, res) => {
  res.send('sign up get');
};

// Login controllers
const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Generate a token
    const token = generateAccessToken(user._id);

    // Store jwt token in cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: JWT_TOKEN_EXPIRES_IN_MS,
    });

    res.status(200).send({ user: user._id });
  } catch (err) {
    res.status(400).send(formatErrors(err));
  }
};

const login_get = (req, res) => {
  res.send('login get');
};

const logout_get = (req, res) => {
  // Delete current cookie
  res.cookie('jwt', '', { maxAge: 1 });

  res.redirect('/user/login');
};

module.exports = {
  signup_post,
  login_post,
  signup_get,
  login_get,
  logout_get,
};
