"use strict";

var express = require('express');

var router = express.Router();

var requirementsModel = require('../models/requirementsModel'); //Get all requirements URL


router.get('/ihtiyaclar', function _callee(req, res) {
  var ihtiyaclar;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(requirementsModel.getIhtiyaclar());

        case 3:
          ihtiyaclar = _context.sent;
          res.status(200).json({
            success: true,
            data: ihtiyaclar
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            message: 'Server error',
            error: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //Get a requirement by ID

router.get('/ihtiyac/:id', function _callee2(req, res) {
  var id, ihtiyac;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(requirementsModel.getIhtiyacById(id));

        case 4:
          ihtiyac = _context2.sent;

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

          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json({
            success: false,
            message: 'Sunucu hatası',
            error: _context2.t0.message
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // /ihtiyaclar/ekle URL

router.get('/ihtiyaclar/ekle', function (req, res) {
  res.send('İhtiyaç ekleme sayfası');
});
module.exports = router;