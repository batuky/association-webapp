require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.SERVER_PORT;

const routes = require('./src/routes/Routes');
const { errorHandler } = require('./src/middleware/middleware'); 

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server activated on ${port}.`);  
});