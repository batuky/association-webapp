const express = require('express');
const router = express.Router();

// /ihtiyaclar URL
router.get('/ihtiyaclar', (req, res) => {
    res.send('İhtiyaçlar sayfası');
});

  // /ihtiyaclar/ekle URL
router.get('/ihtiyaclar/ekle', (req, res) => {
    res.send('İhtiyaç ekleme sayfası');
});
  
  // /ihtiyaclar/{id} URL
router.get('/ihtiyaclar/:id', (req, res) => {
    const id = req.params.id;
    res.send(`İhtiyaç detay sayfası - İhtiyaç ID: ${id}`);
});

module.exports = router;