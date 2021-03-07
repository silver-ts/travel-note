const LogEntry = require('../models/LogEntry');

// Create a new log entry
const logs_post = async (req, res) => {
  const data = req.body;

  try {
    const result = await LogEntry.create(data);

    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get a list of all entries
const logs_get = async (req, res) => {
  try {
    const result = await LogEntry.find();

    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

// Update log entry by id
const logs_put = async (req, res) => {
  const { id, data } = req.body;

  try {
    const result = await LogEntry.findOneAndUpdate({ _id: id }, data, { upsert: true });

    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

// Remove log entry from db by id
const logs_delete = async (req, res) => {
  const { id } = req.body;

  try {
    const result = await LogEntry.findByIdAndRemove({ _id: id });

    res.send(result);
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
