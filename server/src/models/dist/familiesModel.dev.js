"use strict";

var dbPool = require('../config/dbConfig');

var getFamilies = function getFamilies() {
  var query, _ref, rows;

  return regeneratorRuntime.async(function getFamilies$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = "\n        SELECT * FROM aileler;\n    ";
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(dbPool.query(query));

        case 4:
          _ref = _context.sent;
          rows = _ref.rows;
          return _context.abrupt("return", rows);

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          throw _context.t0;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

module.exports = {
  getFamilies: getFamilies
};