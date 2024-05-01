"use strict";

var express = require('express');

var router = express.Router(); // /ihtiyaclar URL

router.get('/ihtiyaclar', function (req, res) {
  res.send('İhtiyaçlar sayfası');
}); // /ihtiyaclar/ekle URL

router.get('/ihtiyaclar/ekle', function (req, res) {
  res.send('İhtiyaç ekleme sayfası');
}); // /ihtiyaclar/{id} URL

router.get('/ihtiyaclar/:id', function (req, res) {
  var id = req.params.id;
  res.send("\u0130htiya\xE7 detay sayfas\u0131 - \u0130htiya\xE7 ID: ".concat(id));
});
module.exports = router;