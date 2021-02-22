const {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
  verifyRefreshToken,
} = require('../helpers/tokens');
const {
  createUser,
  loginUser,
  updateRefreshToken,
  removeRefreshToken,
  getCurrentUser,
} = require('../services/user');
const formatErrors = require('../helpers/formatErrors');

// Sign up controllers
const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create a new user in database
    const user = await createUser(email, password);

    // Generate tokens
    const refreshToken = generateRefreshToken(user._id);
    const accessToken = generateAccessToken(user._id);

    // Store jwt refresh token in db
    await updateRefreshToken(user._id, refreshToken);

    // Send tokens
    sendRefreshToken(res, refreshToken);
    sendAccessToken(res, accessToken, { id: user._id, email: user.email });

  } catch (err) {
    res.status(400).send({ errors: formatErrors(err) });
  }
};

// Login controllers
const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Login user
    const user = await loginUser(email, password);

    // Generate tokens
    const refreshToken = generateRefreshToken(user._id);
    const accessToken = generateAccessToken(user._id);

    // Store jwt refresh token in db
    await updateRefreshToken(user._id, refreshToken);

    // Send tokens
    sendRefreshToken(res, refreshToken);
    sendAccessToken(res, accessToken, { id: user._id, email: user.email });

  } catch (err) {
    res.status(401).send({ errors: formatErrors(err) });
  }
};

const logout_delete = async (req, res) => {
  const refreshToken = req.cookies.jwt;

  try {
    // Verify jwt refresh token
    const { user } = verifyRefreshToken(refreshToken);

    // Remove refresh token from db
    await removeRefreshToken(user);

    // Delete current cookie
    await res.clearCookie('jwt');

    res.status(200).send({
      message: 'Logout success',
    });
  } catch (err) {
    res.status(401).send({ errors: { message: err.message } });
  }
};

const refresh_post = async (req, res) => {
  const refreshToken = req.cookies.jwt;

  // Check if we have a refresh token
  if (!refreshToken) {
    return res.status(200).send({ message: 'No access', user: { accessToken: null } });
  }

  try {
    // Verify jwt refresh token
    const { user } = await verifyRefreshToken(refreshToken);

    // Check if the use exist in database
    const currentUser = await getCurrentUser(user);

    if (!currentUser) {
      return res.status(200).send({ message: 'No access', user: { accessToken: null } });
    }

    // If user exists, we should check refresh token stored with this user
    if (currentUser.refreshToken !== refreshToken) {
      return res.status(200).send({ message: 'No access', user: { accessToken: null } });
    }

    // If token exists, we'll update tokens
    const newRefreshToken = generateRefreshToken(currentUser._id);
    const newAccessToken = generateAccessToken(currentUser._id);

    // Store jwt refresh token in db
    await updateRefreshToken(currentUser._id, newRefreshToken);

    // Send tokens
    sendRefreshToken(res, newRefreshToken);
    sendAccessToken(res, newAccessToken, { id: currentUser._id, email: currentUser.email });

  } catch (err) {
    res.status(403).send({ message: 'No access' });
  }
};

module.exports = {
  signup_post,
  login_post,
  logout_delete,
  refresh_post,
};
