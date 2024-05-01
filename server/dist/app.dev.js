"use strict";

var express = require('express');

var app = express();
var port = 3002; // Backend uygulamanızın rotalarını ve işlemlerini burada tanımlayabilirsiniz

app.listen(port, function () {
  console.log("Server activated on ".concat(port, "."));
});