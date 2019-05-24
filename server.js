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

// express
const express = require('express');
const app = express();
const port = ENV.PORT || 8000;
app.use(express.static("public"))
app.set("view engine", "pug")
app.set("views", "./views")

// Body parser
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Cookie parser
const cookieParser = require("cookie-parser")
app.use(cookieParser(ENV.SESSION_SECRET))

// Auth routes
const authRoute = require("./routes/auth.routes")
app.use("/auth/", authRoute)

// Authmiddleware
const authMiddleware = require("./middlewares/auth.middleware")

// User routes
const userRoute = require("./routes/user.routes")
app.use("/users/", authMiddleware.requireAuth, userRoute)

app.get('/', (req, res) => res.send('Hello Monday'));

app.listen(port, () => {
  logger.log(`Start server, listening on port ${port}!`);
});
