const express = require('express');
const passport = require('passport');

const router = express.Router();

// /kullanici-detay URL
router.get('/kullanici-detay', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
  });
});
  
// /kullanici-detay/sifre-degistir URL
router.get('/kullanici-detay/sifre-degistir', (req, res) => {
  res.send('Şifre değiştirme sayfası');
});

module.exports = router;