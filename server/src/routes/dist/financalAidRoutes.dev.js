"use strict";

var express = require('express');

var router = express.Router();

var financalAidModel = require('../models/financalAidModel'); //Get all financial aids


router.get('/finansal-yardimlar', function _callee(req, res, next) {
  var yardimlar;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(financalAidModel.getFinansalYardimlar());

        case 3:
          yardimlar = _context.sent;
          res.status(200).json({
            success: true,
            data: yardimlar
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
}); //Get a specific financial aid by ID

router.get('/finansal-yardim/:id', function _callee2(req, res, next) {
  var id, yardim;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(financalAidModel.getFinansalYardimById(id));

        case 4:
          yardim = _context2.sent;

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

          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          next(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
module.exports = router;