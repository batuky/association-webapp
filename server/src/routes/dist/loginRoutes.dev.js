"use strict";

var express = require('express');

var router = express.Router(); // /giris URL

router.get('/giris', function (req, res) {
  res.send('Giriş sayfası');
}); // /sifremi-unuttum URL

router.get('/sifremi-unuttum', function (req, res) {
  res.send('Şifremi unuttum sayfası');
}); // /sms-dogrulama URL

router.get('/sms-dogrulama', function (req, res) {
  res.send('SMS doğrulama sayfası');
});
module.exports = router;