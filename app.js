
const express = require('express');
const fs = require('fs')

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
let counter = 0;

const app = express();
app.get('/', (req, res) => {
  try {
    counter = fs.readFileSync('./test.txt', {encoding:'utf8', flag:'r'});
    console.log('got new call 9');
    console.log(counter);
    ++counter;
  } catch (err) {
    console.error(err)
  }

  try {
    fs.writeFileSync('./test.txt', counter.toString())
    //file written successfully
  } catch (err) {
    console.error(err)
  }

  const newMessage = 'Hello world was called ' + counter + ' times';

  res.send(newMessage);
});


function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


let latency = 0;

app.get('/nolatency', async (req, res) => {
  console.log('latency: ' + latency);
  await sleep(latency);
  const newMessage = 'nol ' + new Date();
  res.send(newMessage);
});


app.get('/incl', async (req, res) => {

  // await sleep(5000);
  latency += 400;
  console.log('increasing latency to: ' + latency);
  const newMessage = 'sma ' + new Date();

  res.send(newMessage);
});

app.get('/decl', async (req, res) => {

  console.log('biglatency')
  // await sleep(15000);
  latency -= 400;
  if (latency < 0) {
    latency = 0;
  }
  console.log('increasing latency to: ' + latency);
  const newMessage = 'big ' + new Date();

  res.send(newMessage);
});




app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
