const express = require("express");
const cors = require('cors');

const connection = require("./connection");
const authRoute = require('./routes/authentication');

const app = express();

app.use(express.urlencoded({extended:  true}));
app.use(express.json());
app.use(cors());


// Routing for our product file.
app.use('/api', authRoute);

module.exports = app;