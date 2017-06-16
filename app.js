const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(8080, () => console.log('Listening on port 8080!'));
