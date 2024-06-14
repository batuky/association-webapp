const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const familyRoutes = require('./familyRoutes');
const financialAidRoutes = require('./financalAidRoutes');
const requirementRoutes = require('./requirementRoutes');

// Root URL
router.get('/', (req, res) => {
  res.send('Welcome to the homepage');
});

// Connect routes to the router
router.use('/api/auth', authRoutes);
router.use(userRoutes);
router.use('/api/families', familyRoutes);
router.use(financialAidRoutes);
router.use(requirementRoutes);

module.exports = router;