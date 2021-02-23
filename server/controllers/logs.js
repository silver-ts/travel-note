const LogEntry = require('../models/LogEntry');

const logs_post = async (req, res) => {
  const data = req.body;

  try {
    const result = await LogEntry.create(data);

    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const logs_get = (req, res) => {
  res.send('get all entry logs');
};

module.exports = {
  logs_post,
  logs_get,
};
