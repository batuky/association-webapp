const express = require('express');
const router = express.Router();
const familiesModel = require('../models/familiesModel');

router.get('/aileler', async (req, res) => {
    try {
        const families = await familiesModel.getFamilies();
        res.status(200).json({
            success: true,
            data: families
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

module.exports = router;