import dotenv from "dotenv";

dotenv.config();

const api_key = process.env.API_KEY;

const getCoordinates = (city, callback) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${api_key}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data && data.length > 0) {
        callback(null, {
          latitude: data[0].lat,
          longitude: data[0].lon,
        });
      } else {
        callback("No coordinates found", null);
      }
    })
    .catch((err) => {
      callback(err, null);
    });
};

const getForecast = (city, callback) => {
  getCoordinates(city, (err, coordinates) => {
    if (err) {
      return callback(err, null);
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&appid=${api_key}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          callback(null, data);
        } else {
          callback("No weather data found", null);
        }
      })
      .catch((err) => {
        callback(err, null);
      });
  });
};

getForecast("Craiova", (err, data) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Weather Data:", data);
  }
});
