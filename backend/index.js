const express = require("express");

const connection = require("./connection");

const authRoute = require('./routes/authentication');

const app = express();

app.use(express.urlencoded({extended:  true}));
app.use(express.json());

// Routing for our product file.
app.use('/api', authRoute);

module.exports = app;