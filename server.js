// config environment variables;
const dotenv = require('dotenv');
dotenv.config();
const ENV = process.env

// log module
const logger = require('./monday_modules/logger')

const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req, res) => res.send('Hello Monday'));

app.listen(port, () => {
  logger.log(`Start server, listening on port ${port}!`);
});
