
const express = require('express');
const fs = require('fs')

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
let counter = 0;

const app = express();
app.get('/', (req, res) => {
  const message = `Hello from Vic, now  ${new Date()}`;
  console.log(message);
  res.send(message);
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
