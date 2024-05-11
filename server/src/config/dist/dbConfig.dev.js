"use strict";

require('dotenv').config();

var _require = require('pg'),
    Pool = _require.Pool;

var dbPool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});
module.exports = dbPool;