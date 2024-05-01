const express = require('express');
const router = express.Router();

// /yardimlar URL
router.get('/yardimlar', (req, res) => {
    res.send('Yardımlar sayfası');
});

// /yardimlar/ekle URL
router.get('/yardimlar/ekle', (req, res) => {
    res.send('Yardım ekleme sayfası');
});
  
// /yardimlar/{id} URL
router.get('/yardimlar/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Yardım detay sayfası - Yardım ID: ${id}`);
});

module.exports = router;