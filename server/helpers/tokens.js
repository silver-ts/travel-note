const jwt = require('jsonwebtoken');

require('dotenv').config();
const {
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
} = process.env;

// For cookies convert minutes to milliseconds = m * 60s * 1000ms
const CONVERT_M_TO_MS = 60 * 1000;
const JWT_REFRESH_TOKEN_EXPIRES_IN_MS = JWT_REFRESH_TOKEN_EXPIRES_IN * CONVERT_M_TO_MS;
const JWT_ACCESS_TOKEN_EXPIRES_IN_MS = JWT_ACCESS_TOKEN_EXPIRES_IN * CONVERT_M_TO_MS;

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
 * @param {object} payload - user id and email
 */
const sendAccessToken = (res, accessToken, payload) => {
  res.status(200).send({
    user: {
      accessToken,
      expires: JWT_ACCESS_TOKEN_EXPIRES_IN_MS,
      ...payload,
    },
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

/**
 * Verify jwt refresh token.
 * @param {string} token - refresh token
 */
const verifyRefreshToken = async token => await jwt.verify(token, JWT_REFRESH_TOKEN_SECRET);

/**
 * Verify jwt access token.
 * @param {string} token - access token
 */
const verifyAccessToken = async token => await jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
};
