const { LogEntry, UserLogEntries } = require('../models/LogEntry');

/**
 * Find or create user logs collection
 * @param {String} id - user _id
 */
const findOrCreateLogCollection = async _id =>
  await UserLogEntries.findOneAndUpdate({ _id },
    {
      expire: new Date(),
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });

/**
 * Create a new log entry and save to db
 * @param {Object} data - log data in LogEntrySchema format
 */
const createLogEntry = async data => {
  const entry = await new LogEntry(data);

  // Save changes to the database
  await entry.save();

  return entry;
};

/**
 * Get a list of user logs
 * @param {String} _id - user _id
 */
const getUserLogEntries = async _id =>
// Populate logs data in place of id reference
// Find or create a new documment for user log collection
  await UserLogEntries
    .findOneAndUpdate({ _id }, {
      expire: new Date(),
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    })
    .populate('logs');

/**
 * Edit log entry data
 * @param {String} id - log id
 * @param {Object} data - log data in LogEntrySchema format
 */
const updateLogEntry = async (id, data) =>
  await LogEntry.findOneAndUpdate({ _id: id }, data, { upsert: true });

/**
 * Remove log entry from db
 * @param {String} id - log id
 */
const removeLogEntry = async id => await LogEntry.findByIdAndRemove({ _id: id });

module.exports = {
  findOrCreateLogCollection,
  createLogEntry,
  getUserLogEntries,
  updateLogEntry,
  removeLogEntry,
};
