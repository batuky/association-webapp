"use strict";

var express = require('express');

var router = express.Router(); // /aileler URL

router.get('/aileler', function (req, res) {
  res.send('Aileler sayfası');
}); // /aileler/ekle URL

router.get('/aileler/ekle', function (req, res) {
  res.send('Aile ekleme sayfası');
}); // /aileler/{id} URL

router.get('/aileler/:id', function (req, res) {
  var id = req.params.id;
  res.send("Aile detay sayfas\u0131 - Aile ID: ".concat(id));
}); // /aileler/{id}/uyeler URL

router.get('/aileler/:id/uyeler', function (req, res) {
  var id = req.params.id;
  res.send("Aile \xFCyeleri sayfas\u0131 - Aile ID: ".concat(id));
}); // /aileler/{id}/uyeler/ekle URL

router.get('/aileler/:id/uyeler/ekle', function (req, res) {
  var id = req.params.id;
  res.send("Aile \xFCyesi ekleme sayfas\u0131 - Aile ID: ".concat(id));
});
module.exports = router;