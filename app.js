require('dotenv').config();

const { log } = require('console');
const express = require('express');
const app = express();

const PORT = process.env.PORT;

// database connection
const { connect } = require('./config/db');
connect();

// middlewares
app.use(express.json());

// routes
app.use('/auth', require('./routes'));

app.listen(PORT, () => log('role-based-auth application is running in dev mode on port', PORT));
