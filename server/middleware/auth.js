const jwt = require('jsonwebtoken');
// const User = require('../models/User');

require('dotenv').config();
const { JWT_ACCESS_TOKEN_SECRET } = process.env;

// Protect routes by verifying user token and checking db
const verifyUserAuth = async (req, res, next) => {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    res.locals.user = null;
    res.status(401).send({ error: { message: 'You need to log in' } });
  }

  try {
    // Get token from - 'Bearer token' - header
    const accessToken = authorization.split(' ')[1];

    // Verify jwt token
    const { user } = await jwt.verify(accessToken, JWT_ACCESS_TOKEN_SECRET);

    // Save user to the locals
    res.locals.user = user;
    next();
  } catch (err) {
    res.locals.user = null;
    res.status(401).send({ error: { message: 'You need to log in' } });
  }
};

module.exports = { verifyUserAuth };
