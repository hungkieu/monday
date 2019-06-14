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

const path = require('path');
const express = require('express');
const app = express();
const port = ENV.PORT || 3000;

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cookieParser
const cookieParser = require('cookie-parser');
app.use(cookieParser(ENV.SESSION_SECRET));

// csurf
const csurf = require('csurf')
app.use(csurf({ cookie: true }))

// log module
const logger = require('./monday_modules/logger');
app.use(logger.middleware.bind(logger));

// static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// routers
const routers = require('./routers');
app.use(routers);

// CORS
const cors = require("cors")
app.use(cors())

app.listen(port, () => {
  logger.log(`Start server, listening on port ${port}!`);
});
