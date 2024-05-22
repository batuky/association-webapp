"use strict";

var pool = require('../config/dbConfig');

var getIhtiyaclar = function getIhtiyaclar() {
  var query, _ref, rows;

  return regeneratorRuntime.async(function getIhtiyaclar$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = "\n        SELECT * FROM ihtiyaclar\n        WHERE \"Durum\" = 1;\n    ";
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(pool.query(query));

        case 4:
          _ref = _context.sent;
          rows = _ref.rows;
          return _context.abrupt("return", rows);

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          console.error('Error executing query', _context.t0.stack);
          throw _context.t0;

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

var checkIfFinansalYardim = function checkIfFinansalYardim(ihtiyacId) {
  var query, _ref2, rows;

  return regeneratorRuntime.async(function checkIfFinansalYardim$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          query = "\n        SELECT EXISTS (\n            SELECT 1 FROM yardimlar\n            WHERE \"IhtiyacId\" = $1 AND \"Durum\" = 1\n        );\n    ";
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(pool.query(query, [ihtiyacId]));

        case 4:
          _ref2 = _context2.sent;
          rows = _ref2.rows;
          return _context2.abrupt("return", rows[0].exists);

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](1);
          console.error('Error executing query', _context2.t0.stack);
          throw _context2.t0;

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

var getIhtiyacById = function getIhtiyacById(ihtiyacId) {
  var query, _ref3, rows;

  return regeneratorRuntime.async(function getIhtiyacById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          query = "\n        SELECT * FROM ihtiyaclar\n        WHERE \"Id\" = $1;\n    ";
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(pool.query(query, [ihtiyacId]));

        case 4:
          _ref3 = _context3.sent;
          rows = _ref3.rows;

          if (!(rows.length > 0)) {
            _context3.next = 10;
            break;
          }

          return _context3.abrupt("return", rows[0]);

        case 10:
          return _context3.abrupt("return", null);

        case 11:
          _context3.next = 17;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](1);
          console.error('Error executing query', _context3.t0.stack);
          throw _context3.t0;

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 13]]);
};

module.exports = {
  getIhtiyaclar: getIhtiyaclar,
  getIhtiyacById: getIhtiyacById,
  checkIfFinansalYardim: checkIfFinansalYardim
};