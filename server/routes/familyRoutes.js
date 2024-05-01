const express = require('express');
const router = express.Router();

// /aileler URL
router.get('/aileler', (req, res) => {
    res.send('Aileler sayfası');
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