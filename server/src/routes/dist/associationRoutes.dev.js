"use strict";

var express = require('express');

var router = express.Router(); // /yardimlar URL

router.get('/yardimlar', function (req, res) {
  res.send('Yardımlar sayfası');
}); // /yardimlar/ekle URL

router.get('/yardimlar/ekle', function (req, res) {
  res.send('Yardım ekleme sayfası');
}); // /yardimlar/{id} URL

router.get('/yardimlar/:id', function (req, res) {
  var id = req.params.id;
  res.send("Yard\u0131m detay sayfas\u0131 - Yard\u0131m ID: ".concat(id));
});
module.exports = router;