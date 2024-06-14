"use strict";

require('dotenv').config();

var express = require('express');

var app = express();
var port = process.env.SERVER_PORT;

var routes = require('./src/routes/Routes');

var _require = require('./src/middleware/middleware'),
    errorHandler = _require.errorHandler; // Middleware to parse JSON bodies


app.use(express.json());
app.use(express.urlencoded({
  extended: false
})); // Routes

app.use(routes);
app.use(errorHandler);
app.listen(port, function () {
  console.log("Server activated on ".concat(port, "."));
});