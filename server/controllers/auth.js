const jwt = require('jsonwebtoken');
const {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require('../helpers/tokens');
const { createUser, loginUser } = require('../services/user');
const formatErrors = require('../helpers/formatErrors');
const User = require('../models/User');

require('dotenv').config();
const {
  JWT_REFRESH_TOKEN_SECRET,
} = process.env;

// Sign up controllers
const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create a new user in database
    const user = await createUser(email, password);

    // Generate tokens
    const refreshToken = generateRefreshToken(user._id);
    const accessToken = generateAccessToken(user._id);

    // Store jwt refresh token in db
    await User.findOneAndUpdate({ _id: user._id }, { refreshToken: refreshToken });

    // Send tokens
    sendAccessToken(res, accessToken, user._id);
    sendRefreshToken(res, refreshToken);

  } catch (err) {
    res.status(400).send({ error: formatErrors(err) });
  }
};

// Login controllers
const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password);

    // Generate tokens
    const refreshToken = generateRefreshToken(user._id);
    const accessToken = generateAccessToken(user._id);

    // Store jwt refresh token in db
    await User.findOneAndUpdate({ _id: user._id }, { refreshToken: refreshToken });

    // Send tokens
    sendRefreshToken(res, refreshToken);
    sendAccessToken(res, accessToken, user._id);

  } catch (err) {
    res.status(401).send({ error: { message: err.message } });
  }
};

const logout_delete = async (req, res) => {
  const refreshToken = req.cookies.jwt;

  try {
    const { user } = await jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET);

    // Remove refresh token from db
    await User.findOneAndUpdate({ _id: user }, { refreshToken: null });

    // Delete current cookie
    await res.clearCookie('jwt');

    res.status(200).send({
      message: 'Logout success',
    });
  } catch (err) {
    res.status(401).send({ error: { message: err.message } });
  }
};

const refresh_post = async (req, res) => {
  try {
    const refreshToken = req.cookies.jwt;

    // Check if we have a refresh token
    if (!refreshToken) {
      res.status(403).send({  message: 'no access', accessToken: null });
    }

    // Verify jwt refresh token
    const { user } = await jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET);

    // Check if the use exist in database
    const currentUser = await User.findById(user);

    if (!currentUser) {
      res.status(403).send({  message: 'no access', accessToken: null });
    }

    // If user exists, we should check refresh token stored with this user
    if (currentUser.refreshToken !== refreshToken) {
      res.status(403).send({  message: 'no access', accessToken: null });
    }

    // If token exists, we'll update tokens

    // Generate tokens
    const newRefreshToken = generateRefreshToken(currentUser._id);
    const newAccessToken = generateAccessToken(currentUser._id);

    // Store jwt refresh token in db
    await User.findOneAndUpdate({ _id: currentUser._id }, { refreshToken: newRefreshToken });

    // Send tokens
    sendRefreshToken(res, newRefreshToken);
    sendAccessToken(res, newAccessToken, user._id);
  } catch (err) {
    res.status(403).send({  message: 'no access', accessToken: null });
  }
};

module.exports = {
  signup_post,
  login_post,
  logout_delete,
  refresh_post,
};
