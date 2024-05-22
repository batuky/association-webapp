"use strict";

var dbPool = require('../config/dbConfig'); //Get all families


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
}; //Get a family by ID


function getAileById(id) {
  var query, _ref2, rows;

  return regeneratorRuntime.async(function getAileById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          query = 'SELECT * FROM aileler WHERE "Id" = $1';
          _context2.next = 4;
          return regeneratorRuntime.awrap(dbPool.query(query, [id]));

        case 4:
          _ref2 = _context2.sent;
          rows = _ref2.rows;
          return _context2.abrupt("return", rows[0]);

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.error('Error executing query', _context2.t0.stack);
          throw _context2.t0;

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
} // Get members of a family by family ID


function getUyelerByAileId(aileId) {
  var query, _ref3, rows;

  return regeneratorRuntime.async(function getUyelerByAileId$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          query = "\n        SELECT * FROM aileuyeleri WHERE \"AileId\" = $1;\n    ";
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(dbPool.query(query, [aileId]));

        case 4:
          _ref3 = _context3.sent;
          rows = _ref3.rows;
          return _context3.abrupt("return", rows);

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](1);
          console.error('Error executing query', _context3.t0.stack);
          throw _context3.t0;

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 9]]);
}

module.exports = {
  getFamilies: getFamilies,
  getAileById: getAileById,
  getUyelerByAileId: getUyelerByAileId
};