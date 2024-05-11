"use strict";

var express = require('express');

var router = express.Router(); // /kullanici-detay URL

router.get('/kullanici-detay', function (req, res) {
  res.send('Kullanıcı detay sayfası');
}); // /kullanici-detay/sifre-degistir URL

router.get('/kullanici-detay/sifre-degistir', function (req, res) {
  res.send('Şifre değiştirme sayfası');
});
module.exports = router;