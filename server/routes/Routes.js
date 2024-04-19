import dotenv from 'dotenv';
import express from 'express';
import pkg from 'pg'; 
const { Pool } = pkg;
dotenv.config();

const app = express();
app.use(express.json());



// const pool = new Pool({
//     connectionString: 'postgres://postgres:admin@127.0.0.1:5432/postgres'
//   });

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'admin',
  port: 5432,
});

pool.connect()
    .then(() => console.log('Database connected'))
    .catch(err => {
        console.error('Error connecting to database:', err);
        });
        
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(process.env.DATABASE_URL)
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    console.log(rows);

  } catch (error) {
    console.error(error);
  }
});

export default app;