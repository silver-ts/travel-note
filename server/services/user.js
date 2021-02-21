const User = require('../models/User');

// Create a new user in database
const createUser = async (email, password) => await User.create({ email, password });

// Log in user
const loginUser = async ( email, password) => await User.login(email, password);

module.exports = {
  createUser,
  loginUser,
};
