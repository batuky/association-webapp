const express = require('express');
const router = express.Router();
const requirementsModel = require('../models/requirementsModel');

//Get all requirements URL
router.get('/ihtiyaclar', async (req, res) => {
  try {
      const ihtiyaclar = await requirementsModel.getIhtiyaclar();
      res.status(200).json({
          success: true,
          data: ihtiyaclar
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'Server error',
          error: error.message
      });
  }
});

//Get a requirement by ID
router.get('/ihtiyac/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const ihtiyac = await requirementsModel.getIhtiyacById(id);
      if (ihtiyac) {
          res.status(200).json({
              success: true,
              data: ihtiyac
          });
      } else {
          res.status(404).json({
              success: false,
              message: 'İhtiyaç bulunamadı'
          });
      }
  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'Sunucu hatası',
          error: error.message
      });
  }
});

  // /ihtiyaclar/ekle URL
router.get('/ihtiyaclar/ekle', (req, res) => {
    res.send('İhtiyaç ekleme sayfası');
});
  

module.exports = router;