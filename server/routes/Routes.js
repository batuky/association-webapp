const express = require('express');
const router = express.Router();
const loginRoutes = require('./loginRoutes');
const userRoutes = require('./userRoutes');
const familyRoutes = require('./familyRoutes');
const associationRoutes = require('./associationRoutes');
const requirementRoutes = require('./requirementRoutes');

// Root URL
router.get('/', (req, res) => {
  res.send('Welcome to the homepage');
});

// loginRoutes'ı mevcut router'a bağla
router.use(loginRoutes);
router.use(userRoutes);
router.use(familyRoutes);
router.use(associationRoutes);
router.use(requirementRoutes);

module.exports = router;