const User = require('../models/User');

/**
 * Create a new user in database.
 * @param {string} email - user email
 * @param {string} password - user password
 */
const createUser = async (email, password) => await User.create({ email, password });

/**
 * Log in user.
 * @param {string} email - user email
 * @param {string} password - user password
 */
const loginUser = async ( email, password) => await User.login(email, password);

/**
 * Store JWT refresh token into user in the database.
 * @param {string} id - user id
 * @param {string} token - refresh token
 */
const updateRefreshToken = async (id, token) => await User.findOneAndUpdate({ _id: id }, { refreshToken: token });

/**
 * Remove JWT refresh token from database.
 * @param {string} id - user id
 */
const removeRefreshToken = async  id => await User.findOneAndUpdate({ _id: id }, { refreshToken: null });

/**
 * Get user from the database by id.
 * @param {string} id - user id
 */
const getCurrentUser = async id => await User.findById(id);

module.exports = {
  createUser,
  loginUser,
  updateRefreshToken,
  removeRefreshToken,
  getCurrentUser,
};
