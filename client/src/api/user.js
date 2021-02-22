import axios from 'axios';

/**
 * Register a new user.
 * @param {string} email - user email
 * @param {string} password - user password
 */
export const registerUser = async (email, password) => {
  const res = await axios.post('/api/user/signup', { email, password });
  console.log(res);

  return res;
};

/**
 * Log in a user.
 * @param {string} email - user email
 * @param {string} password - user password
 */
export const loginUser = async (email, password) =>  {
  const res = await axios.post('/api/user/login', { email, password });
  console.log(res);

  return res;
};

/**
 * User logout.
 */
export const logoutUser = async () => {
  const res = await axios.delete('/api/user/logout');
  console.log(res);

  return res;
};

/**
 * Ckeck refresh token and request a new access token.
 */
export const checkRefreshToken = async () => {
  const res = await axios.post('/api/user/refresh-token');
  console.log(res);

  return res.data;
};
