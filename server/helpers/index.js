const formatErrors = require('./formatErrors');
const {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
} = require('./tokens');

module.exports = {
  formatErrors,
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
};
