"use strict";

require('dotenv').config();

var jwt = require('jsonwebtoken');

var JWT_ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY;

function authenticateToken(req, res, next) {
  var authHeader = req.headers['authorization'];
  var token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }

  jwt.verify(token, JWT_ACCESS_SECRET_KEY, function (err, user) {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({
        success: false,
        message: 'Token verification failed'
      });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;