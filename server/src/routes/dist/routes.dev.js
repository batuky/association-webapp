"use strict";

var express = require('express');

var router = express.Router();

var loginRoutes = require('./loginRoutes');

var userRoutes = require('./userRoutes');

var familyRoutes = require('./familyRoutes');

var financalAidRoutes = require('./financalAidRoutes');

var requirementRoutes = require('./requirementRoutes'); // Root URL


router.get('/', function (req, res) {
  res.send('Welcome to the homepage');
}); // loginRoutes'ı mevcut router'a bağla

router.use(loginRoutes);
router.use(userRoutes);
router.use(familyRoutes);
router.use(financalAidRoutes);
router.use(requirementRoutes);
module.exports = router;