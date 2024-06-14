require('dotenv').config();

const jwt = require('jsonwebtoken');
const { JWT_ACCESS_SECRET_KEY } = process.env;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
      return res.status(401).json({ 
          success: false, 
          message: 'No token provided' 
      });
  }

  jwt.verify(token, JWT_ACCESS_SECRET_KEY, (err, user) => {
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