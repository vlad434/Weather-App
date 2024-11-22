import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const api_key = process.env.API_KEY;

export const geocode = (city, callback) => {
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
