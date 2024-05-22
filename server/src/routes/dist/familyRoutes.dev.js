"use strict";

var express = require('express');

var router = express.Router();

var familiesModel = require('../models/familiesModel');

var _require = require('../middleware/middleware'),
    errorHandler = _require.errorHandler;

var _require2 = require('../utils/utlils'),
    isValidId = _require2.isValidId;

router.use(errorHandler); //Get all families

router.get('/aileler', function _callee(req, res, next) {
  var families;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(familiesModel.getFamilies());

        case 3:
          families = _context.sent;
          res.status(200).json({
            success: true,
            data: families
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //Get a family by id

router.get('/aile/:id', function _callee2(req, res, next) {
  var id, aile;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;

          if (isValidId(id)) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: 'Invalid ID format'
          }));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(familiesModel.getAileById(id));

        case 6:
          aile = _context2.sent;

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

          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); //Get members of a family by family id

router.get('/aile/:id/uyeler', function _callee3(req, res, next) {
  var id, uyeler;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;

          if (isValidId(id)) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: 'Invalid ID format'
          }));

        case 3:
          _context3.prev = 3;
          _context3.next = 6;
          return regeneratorRuntime.awrap(familiesModel.getUyelerByAileId(id));

        case 6:
          uyeler = _context3.sent;

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

          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](3);
          next(_context3.t0);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 10]]);
}); // /aileler/ekle URL

router.get('/aile/ekle', function (req, res) {
  res.send('Aile ekleme sayfası');
}); // /aileler/{id}/uyeler/ekle URL

router.get('/aile/:id/uyeler/ekle', function (req, res) {
  var id = req.params.id;
  res.send("Aile \xFCyesi ekleme sayfas\u0131 - Aile ID: ".concat(id));
});
module.exports = router;