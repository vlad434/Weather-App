import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const api_key = "412a55b3385e2afd26fd24523d1fff2e";

export const forecast = (latitude, longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`;

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
            "°C degress out. It feels like " +
            data.main.feels_like +
            "°C."
        );
      } else {
        callback("No weather data found", null);
      }
    })
    .catch((err) => {
      callback(err, null);
    });
};
