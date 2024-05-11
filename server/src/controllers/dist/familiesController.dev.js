"use strict";

var express = require('express');

var router = express.Router();

var familiesModel = require('../models/familiesModel');

router.get('/aileler', function _callee(req, res) {
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
});
module.exports = router;