require('dotenv').config();

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbPool = require('../config/dbConfig');

const router = express.Router();

const { JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY } = process.env;

// Generate Access Token
const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_ACCESS_SECRET_KEY, { expiresIn: '1h' });
};

// Generate Refresh Token
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET_KEY, { expiresIn: '7d' });
};

// Register a new user
router.post('/kayit', async (req, res) => {
  const { KullaniciAdi, Eposta, Sifre, Telefon } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(Sifre, 10);

    // SQL query to insert new user
    const queryText = `
      INSERT INTO kullanicilar ("KullaniciAdi", "Eposta", "Sifre", "Telefon")
      VALUES ($1, $2, $3, $4) RETURNING *`;

    // Execute the query
    const { rows } = await dbPool.query(queryText, [KullaniciAdi, Eposta, hashedPassword, Telefon]);

    // Respond with the created user
    res.status(201).json({ user: rows[0] });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login user
router.post('/giris', async (req, res) => {
  const { Eposta, Sifre } = req.body;

  try {
    // SQL query to find the user by email
    const queryText = 'SELECT * FROM kullanicilar WHERE "Eposta" = $1';
    const { rows } = await dbPool.query(queryText, [Eposta]);

    // If no user is found, respond with an error
    if (rows.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(Sifre, user.Sifre);

    // If the password doesn't match, respond with an error
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create JWT payload
    const payload = { id: user.KullaniciId, username: user.KullaniciAdi };

    // Generate tokens
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Store the refresh token in the database
    const refreshTokenQuery = `
      INSERT INTO refresh_tokens ("KullaniciId", "Token")
      VALUES ($1, $2) RETURNING *`;
    await dbPool.query(refreshTokenQuery, [user.KullaniciId, refreshToken]);

    // Respond with the tokens
    res.json({ accessToken: `Bearer ${accessToken}`, refreshToken });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/token', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token is required' });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET_KEY);

    // SQL query to find the refresh token in the database
    const queryText = 'SELECT * FROM refresh_tokens WHERE "Token" = $1';
    const { rows } = await dbPool.query(queryText, [refreshToken]);

    // If refresh token is not found or invalid, respond with an error
    if (rows.length === 0) {
      return res.status(403).json({ error: 'Invalid refresh token' });
    }

    const storedToken = rows[0];

    // Create new JWT payload
    const payload = { id: decoded.id, username: decoded.username };

    // Generate a new access token
    const newAccessToken = generateAccessToken(payload);

    // Respond with the new access token
    res.json({ accessToken: `Bearer ${newAccessToken}` });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(403).json({ error: 'Refresh token has expired' });
    } else {
      console.error('Error refreshing token:', error);
      res.status(403).json({ error: 'Invalid refresh token' });
    }
  }
});

// Logout endpoint
router.post('/cikis', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token is required' });
  }

  try {
    // SQL query to delete the refresh token from the database
    const queryText = 'DELETE FROM refresh_tokens WHERE "Token" = $1';
    await dbPool.query(queryText, [refreshToken]);

    // Respond with success
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error logging out user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;