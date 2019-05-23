// config environment variables;
const dotenv = require('dotenv');
dotenv.config();
const ENV = process.env

const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req, res) => res.send('Hello Monday'));

app.listen(port, () => console.log(`Listening on port ${port}!`));
