"use strict";

var _require = require('passport-jwt'),
    Strategy = _require.Strategy,
    ExtractJwt = _require.ExtractJwt;

var dbPool = require('./dbConfig');

require('dotenv').config();

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretKey: process.env.JWT_SECRET_KEY
};

module.exports = function (passport) {
  passport.use(new Strategy(opts, function _callee(jwt_payload, done) {
    var id, queryText, _ref, rows;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            id = jwt_payload.id;
            queryText = 'SELECT * FROM users WHERE id = $1';
            _context.next = 5;
            return regeneratorRuntime.awrap(dbPool.query(queryText, [id]));

          case 5:
            _ref = _context.sent;
            rows = _ref.rows;

            if (!(rows.length > 0)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", done(null, rows[0]));

          case 11:
            return _context.abrupt("return", done(null, false));

          case 12:
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            console.error('Error during JWT authentication', _context.t0);
            return _context.abrupt("return", done(_context.t0, false));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 14]]);
  }));
};