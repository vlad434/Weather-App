import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const api_key = "412a55b3385e2afd26fd24523d1fff2e";

export const geocode = (address, callback) => {
  console.log(address);
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${address}&appid=${api_key}`;

  // fetch(url)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     if (data && data.length > 0) {
  //       callback(null, {
  //         latitude: data[0].lat,
  //         longitude: data[0].lon,
  //         location: data[0].name,
  //       });
  //     } else {
  //       callback("No coordinates found", null);
  //     }
  //   })
  //   .catch((err) => {
  //     callback(err, null);
  //   });
};
