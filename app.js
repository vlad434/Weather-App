import { forecast } from "./utils/forecast.js";

forecast("Craiova", (err, data) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Weather Data:", data);
  }
});
