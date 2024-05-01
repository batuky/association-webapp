const express = require('express');
const router = express.Router();

// /kullanici-detay URL
router.get('/kullanici-detay', (req, res) => {
    res.send('Kullanıcı detay sayfası');
});
  
// /kullanici-detay/sifre-degistir URL
router.get('/kullanici-detay/sifre-degistir', (req, res) => {
  res.send('Şifre değiştirme sayfası');
});

module.exports = router;