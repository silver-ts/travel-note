const jwt = require('jsonwebtoken');
const User = require('../models/User');

require('dotenv').config();
const {
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
} = process.env;
// For cookies convert minutes to milliseconds = m * s * ms
const JWT_ACCESS_TOKEN_EXPIRES_IN_MS = JWT_ACCESS_TOKEN_EXPIRES_IN * 60 * 1000;

// DELETE LATER
let refreshTokens = [];

// Create access token using JWT
const generateAccessToken = user =>
  jwt.sign({ user }, JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: `${JWT_ACCESS_TOKEN_EXPIRES_IN}m`,
  });

// Create refresh token using JWT
const generateRefreshToken = user =>
  jwt.sign({ user }, JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: `${JWT_REFRESH_TOKEN_EXPIRES_IN}m`,
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

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Store jwt access token in cookie
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      maxAge: JWT_ACCESS_TOKEN_EXPIRES_IN_MS,
    });

    // Store jwt refresh token in db
    refreshTokens.push(refreshToken);

    res.status(201).send({ user: user._id, refreshToken });
  } catch (err) {
    res.status(400).send(formatErrors(err));
  }
};

// Login controllers
const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Store jwt access token in cookie
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      maxAge: JWT_ACCESS_TOKEN_EXPIRES_IN_MS,
    });

    // Store jwt refresh token in db
    refreshTokens.push(refreshToken);

    res.status(200).send({ user: user._id, refreshToken });
  } catch (err) {
    res.status(401).send(formatErrors(err));
  }
};

const logout_delete = (req, res) => {
  const { refreshToken } = req.body;

  // Delete current cookie
  res.cookie('jwt', '', { maxAge: 1 });

  // Remove refresh token from db
  refreshTokens = refreshTokens.filter(token => token !== refreshToken);

  res.status(204).send('logout success');
};

const refresh_post = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(403).send('no access');
  }

  if (!refreshTokens.includes(refreshToken)) {
    res.status(403).send('no access');
  }

  try {
    // Verify jwt token
    const decoded = await jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET);

    // Generate tokens
    const newAccessToken = generateAccessToken(decoded.user);

    // Store jwt access token in cookie
    res.cookie('jwt', newAccessToken, {
      httpOnly: true,
      maxAge: JWT_ACCESS_TOKEN_EXPIRES_IN_MS,
    });

    res.status(200).send({ user: decoded.user });
  } catch (err) {
    res.status(403).send('no access');
  }
};

module.exports = {
  signup_post,
  login_post,
  logout_delete,
  refresh_post,
};
