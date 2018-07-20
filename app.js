const express = require('express');
const bodyParser = require('body-parser');
const Yelp = require('yelp-api');
const nunjucks = require('nunjucks');
const apiKey = require('./secret') || {key: process.env.API_KEY};

const yelp = new Yelp(apiKey.key);
const app = express();
const PORT = process.env.PORT || 8080;

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

  // yelp query based on user location input
  const params = [{term: 'food'}, {location: userLocation}, {radius: '3500'}, {price: '1,2'}, {open_now: 'true'}];
    yelp.query('businesses/search', params)
      .then(data => {
        let dataObj = JSON.parse(data);
        returnRestaurant(dataObj);
    })
      .catch(console.error);
});

app.listen(PORT, () => console.log('Listening on port ' + PORT + '!'));
