import dotenv from "dotenv";

dotenv.config();

const api_key = process.env.API_KEY;

const getCoordinates = async (city) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${api_key}`;
  const res = await fetch(url);
  if (res.ok) {
    const data = await res.json();
    // console.log(data);
    return {
      latitude: data[0].lat,
      longitude: data[0].lon,
    };
  } else {
    console.log(res.status);
  }
};

const getForecast = async (city) => {
  const coordinates = await getCoordinates(city);
  // console.log(coordinates.latitude, coordinates.longitude);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&appid=${api_key}`;
  const res = await fetch(url);
  if (res.ok) {
    const data = await res.json();
    console.log(data);
  }
};

getForecast("Craiova");
