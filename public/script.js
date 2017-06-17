const hidePizza = () => {
  var pizza = document.getElementById('loading');
  pizza.style.display = 'none';
};

const showPizza = () => {
  var pizza = document.getElementById('loading');
  pizza.style.display = 'block';
};

const positionSuccess = position => {
  setTimeout(hidePizza, 4000);
  let coordinates = position.coords.latitude + '@' +
    position.coords.longitude;

  document.getElementById('userLocation').value = coordinates;
};

const positionError = error => {
  const locationInput = document.getElementById('locationInput');
  if (error) {
    locationInput.style.display = 'block';
  }
};

const getGeolocation = () => {
  const location = navigator.geolocation;
  if (location) {
    location.getCurrentPosition(positionSuccess, positionError);
  } else {
    console.log('geolocation unavailable');
  }
};
