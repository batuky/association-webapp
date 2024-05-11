const express = require('express');
const router = express.Router();
const familiesModel = require('../models/familiesModel');

// /aileler URL
router.get('/aileler', async (req, res) => {
    try {
        const families = await familiesModel.getFamilies(); // Correctly using getFamilies from familiesModel
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
  
// /aileler/ekle URL
router.get('/aileler/ekle', (req, res) => {
    res.send('Aile ekleme sayfası');
});

// /aileler/{id} URL
router.get('/aileler/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Aile detay sayfası - Aile ID: ${id}`);
});

// /aileler/{id}/uyeler URL
router.get('/aileler/:id/uyeler', (req, res) => {
    const id = req.params.id;
    res.send(`Aile üyeleri sayfası - Aile ID: ${id}`);
});

// /aileler/{id}/uyeler/ekle URL
router.get('/aileler/:id/uyeler/ekle', (req, res) => {
    const id = req.params.id;
    res.send(`Aile üyesi ekleme sayfası - Aile ID: ${id}`);
});

module.exports = router;