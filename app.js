const express = require('express');
const path = require('path');
//const axios = require('axios');
const bodyParser = require('body-parser');
const Yelp = require('node-yelp-fusion');

const yelp = new Yelp({id: 'Yds_fV9S4-XDnKgTI2LPpw', secret: 'M1fEXT0FiUdJndTtaB7qaMKD3YisibufWwm0g1ha5Dit3MPXljZTuJK0y9Myu8NJ' });
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static('public'));

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/food', (req, res, next) => {
  yelp.search('term=Biryani&location=New York')
    .then(function(result){
           res.json(result);
        });
});

app.listen(8080, () => console.log('Listening on port 8080!'));
