const express = require('express');
const router = express.Router();
const financalAidModel = require('../models/financalAidModel');

//Get all financial aids
router.get('/finansal-yardimlar', async (req, res, next) => {
    try {
        const yardimlar = await financalAidModel.getFinansalYardimlar();
        res.status(200).json({
            success: true,
            data: yardimlar
        });
    } catch (error) {
        next(error);
    }
});

//Get a specific financial aid by ID
router.get('/finansal-yardim/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const yardim = await financalAidModel.getFinansalYardimById(id);
        if (yardim) {
            res.status(200).json({
                success: true,
                data: yardim
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Yardım not found'
            });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
