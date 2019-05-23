// config environment variables;
const dotenv = require('dotenv');
dotenv.config();
const ENV = process.env;

// connect mongodb
const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.connect(ENV.DB_HOST, { useNewUrlParser: true })
  .then(() => console.log('DB Connected!'));
db.on('error', (err) => {
  console.log('DB connection error:', err.message);
})

// log module
const logger = require('./monday_modules/logger')

const express = require('express');
const app = express();
const port = ENV.PORT || 8000;

app.get('/', (req, res) => res.send('Hello Monday'));

app.listen(port, () => {
  logger.log(`Start server, listening on port ${port}!`);
});
