const express = require('express');
const bodyParser = require('body-parser');
const Yelp = require('node-yelp-fusion');
const nunjucks = require('nunjucks');
const secret = require('./secret');

const yelp = new Yelp(secret);
const app = express();

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files
app.use(express.static('public'));

// nunjucks templating setup
app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {noCache: true});

// routes
app.get('/', (req, res, next) => {
  res.render('button.html');
});

app.post('/', (req, res, next) => {
  let userLocation = req.body.userLocation;

  const findOneRestaurant = obj => {
    let arrLen = obj.businesses.length;
    let randIdx = Math.floor(Math.random() * arrLen);
    return obj.businesses[randIdx];
  };

  const returnRestaurant = result => {
    let restaurant = findOneRestaurant(result);
    res.render('result', {restaurant: restaurant});
  };

  // user location is lat/long
  if (userLocation.indexOf('@') !== -1){
    let coords = userLocation.split('@');

    yelp.search(`term=food&latitude=${coords[0]}&longitude=${coords[1]}&radius=3500&price=1,2&open_now=true`)
      .then(returnRestaurant)
      .catch(err => {
        let latLongErr = document.getElementById('latLongErr');
        latLongErr.style.display('block');
        console.error(err);

      });
  }
  // user location is manual input
  else {
    yelp.search(`term=food&location=${userLocation}&radius=3500&price=1,2&open_now=true`)
      .then(returnRestaurant)
      .catch(console.error);
  }
});

app.listen(8080, () => console.log('Listening on port 8080!'));
