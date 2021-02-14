const User = require('../models/User');

const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });

    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const login_post = (req, res) => {
  res.send('Login post');
};

module.exports = {
  signup_post,
  login_post,
};
