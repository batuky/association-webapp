require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.SERVER_PORT;

const routes = require('./src/routes/Routes');

app.use(routes);

app.listen(port, () => {
  console.log(`Server activated on ${port}.`);  
});