import dotenv from "dotenv";
import fetch from "node-fetch";
import { geocode } from "./geocode.js";

dotenv.config();

const api_key = process.env.API_KEY;

export const forecast = (city, callback) => {
  geocode(city, (err, coordinates) => {
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
