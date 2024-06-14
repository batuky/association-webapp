"use strict";

var express = require('express');

var router = express.Router();

var authRoutes = require('./authRoutes');

var userRoutes = require('./userRoutes');

var familyRoutes = require('./familyRoutes');

var financialAidRoutes = require('./financalAidRoutes');

var requirementRoutes = require('./requirementRoutes'); // Root URL


router.get('/', function (req, res) {
  res.send('Welcome to the homepage');
}); // Connect routes to the router

router.use('/api/auth', authRoutes);
router.use(userRoutes);
router.use('/api/families', familyRoutes);
router.use(financialAidRoutes);
router.use(requirementRoutes);
module.exports = router;