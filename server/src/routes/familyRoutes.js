const express = require('express');
const router = express.Router();
const familiesModel = require('../models/familiesModel');
const { errorHandler } = require('../middleware/middleware');
const { isValidId } = require('../utils/utlils');

router.use(errorHandler);

//Get all families
router.get('/aileler', async (req, res, next) => {
    try {
        const families = await familiesModel.getFamilies();
        res.status(200).json({
            success: true,
            data: families
        });
    } catch (error) {
        next(error);
    }
});

//Get a family by id
router.get('/aile/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }
        const aile = await familiesModel.getAileById(id);
        if (aile) {
            res.status(200).json({
                success: true,
                data: aile
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Aile not found'
            });
        }
    } catch (error) {
        next(error);
    }
});


//Get members of a family by family id
router.get('/aile/:id/uyeler', async (req, res, next) => {
    const id = req.params.id;
    if (!isValidId(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID format'
        });
    }

    try {
        const uyeler = await familiesModel.getUyelerByAileId(id);
        if (uyeler && uyeler.length > 0) {
            res.status(200).json({
                success: true,
                data: uyeler
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No members found for this family'
            });
        }
    } catch (error) {
        next(error);
    }
});


// /aileler/ekle URL
router.get('/aile/ekle', (req, res) => {
    res.send('Aile ekleme sayfası');
});

// /aileler/{id}/uyeler/ekle URL
router.get('/aile/:id/uyeler/ekle', (req, res) => {
    const id = req.params.id;
    res.send(`Aile üyesi ekleme sayfası - Aile ID: ${id}`);
});

module.exports = router;