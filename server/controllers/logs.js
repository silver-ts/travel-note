const {
  findOrCreateLogCollection,
  createLogEntry,
  getUserLogEntries,
  updateLogEntry,
  removeLogEntry,
} = require('../services/userLogs');

// Create a new log entry
const logs_post = async (req, res) => {
  const data = req.body;
  const _id = res.locals.user;

  try {
    // Find or create a new documment for user log collection
    const collection = await findOrCreateLogCollection(_id);

    // Save a new log from the data provided
    const logEntry = await createLogEntry(data);

    // Save user logs as array of id references
    await collection.logs.push(logEntry);
    await collection.save();

    res.send(collection);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get a list of all entries
const logs_get = async (req, res) => {
  const _id = res.locals.user;

  try {
    const collection = await getUserLogEntries(_id);

    res.send(collection.logs);
  } catch (err) {
    res.send(err);
  }
};

// Update log entry by id
const logs_put = async (req, res) => {
  const { id, data } = req.body;

  try {
    const entry = await updateLogEntry(id, data);

    res.send(entry);
  } catch (err) {
    res.send(err);
  }
};

// Remove log entry from db by id
const logs_delete = async (req, res) => {
  const { id } = req.body;
  const _id = res.locals.user;

  try {
    // const result = await LogEntry.findByIdAndRemove({ _id: id });
    await removeLogEntry(id);

    // Find or create a new documment for user log collection
    const collection = await findOrCreateLogCollection(_id);

    await collection.logs.remove(id);
    await collection.save();

    res.send(collection);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  logs_post,
  logs_get,
  logs_put,
  logs_delete,
};
