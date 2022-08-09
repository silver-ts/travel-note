const app = require('./app');

// Require variables from .env file
require('dotenv').config();
const { PORT } = process.env;

// Listen to the server
app.listen(PORT || 1337 );
