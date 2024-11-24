import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const api_key = process.env.API_KEY;

export const forecast = (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${api_key}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        callback(
          null,
          data.weather[0].description +
            "." +
            " It is currently " +
            data.main.temp +
            " degress out. It feels like " +
            data.main.feels_like +
            " degrees."
        );
      } else {
        callback("No weather data found", null);
      }
    })
    .catch((err) => {
      callback(err, null);
    });
};
