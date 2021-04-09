const { verifyAccessToken } = require('../helpers/tokens');

// Protect routes by verifying user token and checking db
const verifyUserAuth = async (req, res, next) => {
  const accessToken = req.headers['authorization'];

  if (!accessToken) {
    res.locals.user = null;
    res.status(401).send({ error: { message: 'You need to log in' } });
  }

  try {
    // Verify jwt token
    const { user } = await verifyAccessToken(accessToken);

    // Save user to the locals
    res.locals.user = user;

    next();
  } catch (err) {
    res.locals.user = null;
    res.status(401).send({ error: { message: 'You need to log in' } });
  }
};

module.exports = verifyUserAuth;
