const express = require('express');
const router = express.Router();

// /giris URL
router.get('/giris', (req, res) => {
  res.send('Giriş sayfası');
});

// /sifremi-unuttum URL
router.get('/sifremi-unuttum', (req, res) => {
  res.send('Şifremi unuttum sayfası');
});

// /sms-dogrulama URL
router.get('/sms-dogrulama', (req, res) => {
  res.send('SMS doğrulama sayfası');
});

module.exports = router;