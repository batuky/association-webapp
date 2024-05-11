"use strict";

require('dotenv').config();

var express = require('express');

var app = express();
var port = process.env.SERVER_PORT;

var routes = require('./src/routes/Routes');

app.use(routes);
app.listen(port, function () {
  console.log("Server activated on ".concat(port, "."));
});