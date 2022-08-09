const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(cors());

app.use((req, res) => {
  res.status(404).send('<h1>Not Found</h1>');
});

const port = process.env.PORT || '3000';

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
