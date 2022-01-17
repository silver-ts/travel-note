const RateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');

const {
  MONGO_DB_CONNECT,
} = process.env;

const rateLimitDelay = 5 * 60 * 1000; // 5 min delay
const limiter = RateLimit({
  store: new MongoStore({
    uri: MONGO_DB_CONNECT,
    expireTimeMs: rateLimitDelay,
  }),
  max: 50,
  windowMs: rateLimitDelay,
  message:
		'Too many requests created from this IP',
});

module.exports = limiter;
