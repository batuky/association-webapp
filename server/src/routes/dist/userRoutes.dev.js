"use strict";

var express = require('express');

var passport = require('passport');

var router = express.Router(); // /kullanici-detay URL

router.get('/kullanici-detay', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email
  });
}); // /kullanici-detay/sifre-degistir URL

router.get('/kullanici-detay/sifre-degistir', function (req, res) {
  res.send('Şifre değiştirme sayfası');
});
module.exports = router;