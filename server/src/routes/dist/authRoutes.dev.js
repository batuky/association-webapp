"use strict";

require('dotenv').config();

var express = require('express');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var dbPool = require('../config/dbConfig');

var router = express.Router();
var _process$env = process.env,
    JWT_ACCESS_SECRET_KEY = _process$env.JWT_ACCESS_SECRET_KEY,
    JWT_REFRESH_SECRET_KEY = _process$env.JWT_REFRESH_SECRET_KEY; // Generate Access Token

var generateAccessToken = function generateAccessToken(payload) {
  return jwt.sign(payload, JWT_ACCESS_SECRET_KEY, {
    expiresIn: '1h'
  });
}; // Generate Refresh Token


var generateRefreshToken = function generateRefreshToken(payload) {
  return jwt.sign(payload, JWT_REFRESH_SECRET_KEY, {
    expiresIn: '7d'
  });
}; // Register a new user


router.post('/kayit', function _callee(req, res) {
  var _req$body, KullaniciAdi, Eposta, Sifre, Telefon, hashedPassword, queryText, _ref, rows;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, KullaniciAdi = _req$body.KullaniciAdi, Eposta = _req$body.Eposta, Sifre = _req$body.Sifre, Telefon = _req$body.Telefon;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(Sifre, 10));

        case 4:
          hashedPassword = _context.sent;
          // SQL query to insert new user
          queryText = "\n      INSERT INTO kullanicilar (\"KullaniciAdi\", \"Eposta\", \"Sifre\", \"Telefon\")\n      VALUES ($1, $2, $3, $4) RETURNING *"; // Execute the query

          _context.next = 8;
          return regeneratorRuntime.awrap(dbPool.query(queryText, [KullaniciAdi, Eposta, hashedPassword, Telefon]));

        case 8:
          _ref = _context.sent;
          rows = _ref.rows;
          // Respond with the created user
          res.status(201).json({
            user: rows[0]
          });
          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](1);
          console.error('Error registering user:', _context.t0);
          res.status(500).json({
            error: 'Internal server error'
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 13]]);
}); // Login user

router.post('/giris', function _callee2(req, res) {
  var _req$body2, Eposta, Sifre, queryText, _ref2, rows, user, isMatch, payload, accessToken, refreshToken, refreshTokenQuery;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, Eposta = _req$body2.Eposta, Sifre = _req$body2.Sifre;
          _context2.prev = 1;
          // SQL query to find the user by email
          queryText = 'SELECT * FROM kullanicilar WHERE "Eposta" = $1';
          _context2.next = 5;
          return regeneratorRuntime.awrap(dbPool.query(queryText, [Eposta]));

        case 5:
          _ref2 = _context2.sent;
          rows = _ref2.rows;

          if (!(rows.length === 0)) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            error: 'Invalid credentials'
          }));

        case 9:
          user = rows[0]; // Compare the provided password with the stored hashed password

          _context2.next = 12;
          return regeneratorRuntime.awrap(bcrypt.compare(Sifre, user.Sifre));

        case 12:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            error: 'Invalid credentials'
          }));

        case 15:
          // Create JWT payload
          payload = {
            id: user.KullaniciId,
            username: user.KullaniciAdi
          }; // Generate tokens

          accessToken = generateAccessToken(payload);
          refreshToken = generateRefreshToken(payload); // Store the refresh token in the database with default status 'active'

          refreshTokenQuery = "\n      INSERT INTO refresh_tokens (\"KullaniciId\", \"Token\", \"Durum\")\n      VALUES ($1, $2, 'active') RETURNING *";
          _context2.next = 21;
          return regeneratorRuntime.awrap(dbPool.query(refreshTokenQuery, [user.KullaniciId, refreshToken]));

        case 21:
          // Respond with the tokens
          res.json({
            accessToken: "Bearer ".concat(accessToken),
            refreshToken: refreshToken
          });
          _context2.next = 28;
          break;

        case 24:
          _context2.prev = 24;
          _context2.t0 = _context2["catch"](1);
          console.error('Error logging in user:', _context2.t0);
          res.status(500).json({
            error: 'Internal server error'
          });

        case 28:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 24]]);
}); // Refresh access token

router.post('/token', function _callee3(req, res) {
  var refreshToken, decoded, queryText, _ref3, rows, storedToken, payload, newAccessToken;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          refreshToken = req.body.refreshToken;

          if (refreshToken) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(401).json({
            error: 'Refresh token is required'
          }));

        case 3:
          _context3.prev = 3;
          // Verify the refresh token
          decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET_KEY); // SQL query to find the refresh token in the database

          queryText = 'SELECT * FROM refresh_tokens WHERE "Token" = $1 AND "Durum" = \'active\'';
          _context3.next = 8;
          return regeneratorRuntime.awrap(dbPool.query(queryText, [refreshToken]));

        case 8:
          _ref3 = _context3.sent;
          rows = _ref3.rows;

          if (!(rows.length === 0)) {
            _context3.next = 12;
            break;
          }

          return _context3.abrupt("return", res.status(403).json({
            error: 'Invalid or inactive refresh token'
          }));

        case 12:
          storedToken = rows[0]; // Create new JWT payload

          payload = {
            id: decoded.id,
            username: decoded.username
          }; // Generate a new access token

          newAccessToken = generateAccessToken(payload); // Respond with the new access token

          res.json({
            accessToken: "Bearer ".concat(newAccessToken)
          });
          _context3.next = 21;
          break;

        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](3);

          if (_context3.t0.name === 'TokenExpiredError') {
            res.status(403).json({
              error: 'Refresh token has expired'
            });
          } else {
            console.error('Error refreshing token:', _context3.t0);
            res.status(403).json({
              error: 'Invalid refresh token'
            });
          }

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 18]]);
}); // Logout endpoint

router.post('/cikis', function _callee4(req, res) {
  var refreshToken, queryText;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          refreshToken = req.body.refreshToken;

          if (refreshToken) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            error: 'Refresh token is required'
          }));

        case 3:
          _context4.prev = 3;
          // SQL query to set the Durum of the refresh token to 'inactive'
          queryText = 'UPDATE refresh_tokens SET "Durum" = \'inactive\' WHERE "Token" = $1';
          _context4.next = 7;
          return regeneratorRuntime.awrap(dbPool.query(queryText, [refreshToken]));

        case 7:
          // Respond with success
          res.status(200).json({
            message: 'Logged out successfully'
          });
          _context4.next = 14;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](3);
          console.error('Error logging out user:', _context4.t0);
          res.status(500).json({
            error: 'Internal server error'
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 10]]);
});
module.exports = router;