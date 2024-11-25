import { geocode } from "./geocode.js";
import { forecast } from "./forecast.js";

export const getCities = async () => {
  const capitalsArr = [
    "Amsterdam",
    "Andorra la Vella",
    "Athens",
    "Belgrade",
    "Berlin",
    "Bern",
    "Bratislava",
    "Brussels",
    "Bucharest",
    "Budapest",
    "Chisinau",
    "Copenhagen",
    "Dublin",
    "Helsinki",
    "Kiev",
    "Lisbon",
    "Ljubljana",
    "London",
    "Luxembourg",
    "Madrid",
    "Minsk",
    "Monaco",
    "Moscow",
    "Nicosia",
    "Oslo",
    "Paris",
    "Podgorica",
    "Prague",
    "Reykjavik",
    "Riga",
    "Rome",
    "Sarajevo",
    "Skopje",
    "Sofia",
    "Stockholm",
    "Tallinn",
    "Tirana",
    "Vaduz",
    "Valletta",
    "Vatican",
    "Vienna",
    "Vilnius",
    "Warsaw",
    "Zagreb",
  ];

  const countriesArr = [
    "Netherlands",
    "Andorra",
    "Greece",
    "Serbia",
    "Germany",
    "Switzerland",
    "Slovakia",
    "Belgium",
    "Romania",
    "Hungary",
    "Moldova",
    "Denmark",
    "Ireland",
    "Finland",
    "Ukraine",
    "Portugal",
    "Slovenia",
    "United Kingdom",
    "Luxembourg",
    "Spain",
    "Belarus",
    "Monaco",
    "Russia",
    "Cyprus",
    "Norway",
    "France",
    "Montenegro",
    "Czech Republic",
    "Iceland",
    "Latvia",
    "Italy",
    "Bosnia",
    "Macedonia",
    "Bulgaria",
    "Sweden",
    "Estonia",
    "Albania",
    "Liechtenstein",
    "Malta",
    "Holy See",
    "Austria",
    "Lithuania",
    "Poland",
    "Croatia",
  ];

  const dataArray = await Promise.all(
    capitalsArr.map(async (capital, index) => {
      try {
        const { latitude, longitude } = await new Promise((resolve, reject) => {
          geocode(capital, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        });

        const forecastData = await new Promise((resolve, reject) => {
          forecast(latitude, longitude, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        });

        return {
          id: index,
          country: countriesArr[index],
          capital,
          latitude: latitude.toFixed(2),
          longitude: longitude.toFixed(2),
          forecast: forecastData,
        };
      } catch (err) {
        console.error(`Error processing ${capital}:`, err);
        return null;
      }
    })
  );

  return dataArray.filter((entry) => entry !== null);
};
