"use strict";

var dbPool = require('../config/dbConfig'); //Get all families


var getFinansalYardimlar = function getFinansalYardimlar() {
  var query, _ref, rows;

  return regeneratorRuntime.async(function getFinansalYardimlar$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = "\n        SELECT * FROM yardimlar\n        WHERE \"IhtiyacId\" IS NULL AND \"Durum\" = 1;\n    ";
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
          console.error('Error executing query', _context.t0.stack);
          throw _context.t0;

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 9]]);
}; //Get a financal aid by ID


var getFinansalYardimById = function getFinansalYardimById(id) {
  var query, _ref2, rows;

  return regeneratorRuntime.async(function getFinansalYardimById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          query = "\n        SELECT * FROM yardimlar\n        WHERE \"Id\" = $1 AND \"IhtiyacId\" IS NULL AND \"Durum\" = 1;\n    ";
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(dbPool.query(query, [id]));

        case 4:
          _ref2 = _context2.sent;
          rows = _ref2.rows;

          if (!(rows.length === 0)) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", null);

        case 8:
          return _context2.abrupt("return", rows[0]);

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](1);
          console.error('Error executing query', _context2.t0.stack);
          throw _context2.t0;

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 11]]);
}; //Add a financal aid


var addFinansalYardim = function addFinansalYardim(aileId, yardimiYapanKullaniciId, yardim, yardimAciklama) {
  var query, _ref3, rows;

  return regeneratorRuntime.async(function addFinansalYardim$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          query = "\n        INSERT INTO yardimlar (\"AileId\", \"YardimiYapanKullaniciId\", \"Yardim\", \"YardimAciklama\", \"KayitTarihi\", \"GuncellemeTarihi\", \"Durum\")\n        VALUES ($1, $2, $3, $4, NOW(), NOW(), 1)\n        RETURNING *;\n    ";
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(dbPool.query(query, [aileId, yardimiYapanKullaniciId, yardim, yardimAciklama]));

        case 4:
          _ref3 = _context3.sent;
          rows = _ref3.rows;
          return _context3.abrupt("return", rows[0]);

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
}; //Update the financal aid


var updateFinansalYardim = function updateFinansalYardim(id, yardim, yardimAciklama) {
  var query, _ref4, rows;

  return regeneratorRuntime.async(function updateFinansalYardim$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          query = "\n        UPDATE yardimlar\n        SET \"Yardim\" = $2, \"YardimAciklama\" = $3, \"GuncellemeTarihi\" = NOW()\n        WHERE \"Id\" = $1 AND \"IhtiyacId\" IS NULL AND \"Durum\" = 1\n        RETURNING *;\n    ";
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(dbPool.query(query, [id, yardim, yardimAciklama]));

        case 4:
          _ref4 = _context4.sent;
          rows = _ref4.rows;
          return _context4.abrupt("return", rows[0]);

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](1);
          console.error('Error executing query', _context4.t0.stack);
          throw _context4.t0;

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

module.exports = {
  getFinansalYardimlar: getFinansalYardimlar,
  getFinansalYardimById: getFinansalYardimById,
  addFinansalYardim: addFinansalYardim,
  updateFinansalYardim: updateFinansalYardim
};