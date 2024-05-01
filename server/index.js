const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 3002;

const routes = require('./routes/routes');

app.use(routes);

app.listen(port, () => {
  console.log(`Server activated on ${port}.`);
});