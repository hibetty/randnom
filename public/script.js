const positionSuccess = position => {
  console.log({lat: position.coords.longitude,
    long: position.coords.longitude});
    return {lat: position.coords.longitude,
    long: position.coords.longitude};
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
