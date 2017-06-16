const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Yelp = require('node-yelp-fusion');

const yelp = new Yelp({id: 'Yds_fV9S4-XDnKgTI2LPpw', secret: 'M1fEXT0FiUdJndTtaB7qaMKD3YisibufWwm0g1ha5Dit3MPXljZTuJK0y9Myu8NJ' });
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.post('/', (req, res, next) => {
  let userLocation = req.body.userLocation;

  const findOneRestaurant = (obj) => {
    let arrLen = obj.businesses.length;
    let randIdx = Math.floor(Math.random() * arrLen);
    return obj.businesses[randIdx];
  };

  if (userLocation.indexOf('@') !== -1){ //LAT-LONG
    let coords = userLocation.split('@');

    yelp.search(`term=food&latitude=${coords[0]}&longitude=${coords[1]}&radius=3500&price=1,2&open_now=true`)
      .then(result => {
    let restaurant = findOneRestaurant(result);
    res.json(restaurant);
  })
      .catch(console.error);
  } else { // USER INPUT
    yelp.search(`term=food&location=${userLocation}&radius=3500&price=1,2&open_now=true`)
  .then(result => {
    let restaurant = findOneRestaurant(result);
    res.json(restaurant);
  })
  .catch(console.error);
  }
});

app.listen(8080, () => console.log('Listening on port 8080!'));
