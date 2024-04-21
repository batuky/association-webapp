import express from 'express';
import pkg from 'pg';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/authenticateToken.js'

dotenv.config()

const { Pool } = pkg;
const app = express();
app.use(express.json());

const env = process.env;

const pool = new Pool({
  user: env.DB_USER,
  host: env.DB_HOST,
  database: env.DB_NAME,
  password: env.DB_PASSWORD,
  port: env.DB_PORT,
});

pool.connect()
    .then(() => console.log('Database connected'))
    .catch(err => {
        console.error('Error connecting to database:', err);
        });
        
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    if (rows.length > 0) {
      // user found, create a token
      const token = jwt.sign(
        { userId: rows[0].id, username: rows[0].username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      console.log('Login successful:', rows);
      res.status(200).json({ message: "Login successful", token });
    } else {
      console.log('Login failed');
      res.status(401).json({ message: "Login failed" });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.get('/adminDashboard', authenticateToken, (req, res) => {
  res.status(200).json({ message: "Welcome to the admin dashboard!", username: req.user });
});

export default app;