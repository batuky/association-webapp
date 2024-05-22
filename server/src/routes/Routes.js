const express = require('express');
const router = express.Router();
const loginRoutes = require('./loginRoutes');
const userRoutes = require('./userRoutes');
const familyRoutes = require('./familyRoutes');
const financalAidRoutes = require('./financalAidRoutes');
const requirementRoutes = require('./requirementRoutes');

// Root URL
router.get('/', (req, res) => {
  res.send('Welcome to the homepage');
});

// loginRoutes'ı mevcut router'a bağla
router.use(loginRoutes);
router.use(userRoutes);
router.use(familyRoutes);
router.use(financalAidRoutes);
router.use(requirementRoutes);

module.exports = router;