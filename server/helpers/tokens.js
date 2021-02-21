const jwt = require('jsonwebtoken');

require('dotenv').config();
const {
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
} = process.env;

// For cookies convert minutes to milliseconds = m * 60s * 1000ms
const JWT_REFRESH_TOKEN_EXPIRES_IN_MS = JWT_REFRESH_TOKEN_EXPIRES_IN * 60 * 1000;

/**
 * Create access token using JWT.
 * @param {string} user - user id
 */
const generateAccessToken = user =>
  jwt.sign({ user }, JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: `${JWT_ACCESS_TOKEN_EXPIRES_IN}m`,
  });

/**
 * Create refresh token using JWT.
 * @param {string} user - user id
 */
const generateRefreshToken = user =>
  jwt.sign({ user }, JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: `${JWT_REFRESH_TOKEN_EXPIRES_IN}m`,
  });

/**
 * Send accessToken and user.
 * @param {object} res - pass response
 * @param {string} accessToken - jwt access token
 * @param {string} user - user id
 */
const sendAccessToken = (res, accessToken, user) => {
  res.send({
    accessToken,
    user,
  });
};

/**
 * Store jwt access token in cookie
 * @param {object} res - pass response
 * @param {string} refreshToken - jwt refresh token
 */
const sendRefreshToken = (res, refreshToken) => {
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    maxAge: JWT_REFRESH_TOKEN_EXPIRES_IN_MS,
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
};
