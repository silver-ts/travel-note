const { LogEntry, UserLogEntries } = require('../models/LogEntry');

// Create a new log entry
const logs_post = async (req, res) => {
  const data = req.body;
  const _id = res.locals.user;

  try {
    // Find or create a new documment for user log collection
    const result = await UserLogEntries.findOneAndUpdate({ _id }, { expire: new Date() },  { upsert: true, new: true, setDefaultsOnInsert: true });

    // Save a new log from the data provided
    const lol = await new LogEntry(data);
    await lol.save();

    // Save user logs as array of id references
    await result.logs.push(lol);
    await result.save();

    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get a list of all entries
const logs_get = async (req, res) => {
  const _id = res.locals.user;

  try {
    // Populate logs data in place of id reference
    // Find or create a new documment for user log collection
    const result = await UserLogEntries
      .findOneAndUpdate({ _id }, { expire: new Date() },  {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true })
      .populate('logs');

    res.send(result.logs);
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
  const _id = res.locals.user;

  try {
    const result = await LogEntry.findByIdAndRemove({ _id: id });

    // Find or create a new documment for user log collection
    const list = await UserLogEntries.findOneAndUpdate({ _id }, { expire: new Date() },  { upsert: true, new: true, setDefaultsOnInsert: true });

    list.logs.remove(id);

    await list.save();

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
