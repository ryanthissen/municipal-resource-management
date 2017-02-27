const express = require('express');
const nodemon = require('nodemon');

const app = express();

app.use(express.static(__dirname));

const PORT = 8080;

app.listen(PORT, () => {
  console.log('App is listening on port 8080!' );
});
