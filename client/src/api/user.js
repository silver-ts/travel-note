import axios from 'axios';

/**
 * Register a new user
 * @param {string} email - user email
 * @param {string} password - user password
 */
export const registerUser = async (email, password) => await axios.post(
  '/api/user/signup',
  { email, password },
);

/**
 * Log in a user
 * @param {string} email - user email
 * @param {string} password - user password
 */
export const loginUser = async (email, password) =>  await axios.post(
  '/api/user/login',
  { email, password },
);

/**
 * User logout
 */
export const logoutUser = async () => await axios.delete('/api/user/logout');

/**
 * Ckeck "refresh token" and request a new "access token"
 */
export const checkRefreshToken = async () => await axios.post(
  '/api/user/refresh-token',
);
