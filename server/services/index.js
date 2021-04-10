const {
  createUser,
  loginUser,
  updateRefreshToken,
  removeRefreshToken,
  getCurrentUser,
} = require('./user');
const {
  findOrCreateLogCollection,
  createLogEntry,
  getUserLogEntries,
  updateLogEntry,
  removeLogEntry,
} = require('./userLogs');

module.exports = {
  createUser,
  loginUser,
  updateRefreshToken,
  removeRefreshToken,
  getCurrentUser,
  findOrCreateLogCollection,
  createLogEntry,
  getUserLogEntries,
  updateLogEntry,
  removeLogEntry,
};
