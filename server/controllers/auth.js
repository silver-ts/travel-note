const User = require('../models/User');

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

  return { errors };
};

const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create a new user in database
    const user = await User.create({ email, password });

    res.status(201).send({ user: user._id });
  } catch (err) {
    res.status(400).send(formatErrors(err));
    // res.status(400).send(err);
  }
};

const login_post = (req, res) => {
  res.send('Login post');
};

module.exports = {
  signup_post,
  login_post,
};
