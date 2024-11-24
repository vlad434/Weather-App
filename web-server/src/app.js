import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import hbs from "hbs";
import { geocode } from "./utils/geocode.js";
import { forecast } from "./utils/forecast.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlehars engine and views location
app.set("view engine", "hbs"); // setting template engine to hbs
app.set("views", viewsPath); //custom views location
hbs.registerPartials(partialsPath); // link with path to partials folder

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Vladone",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Vladone",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Help message!",
    title: "Help",
    name: "Vladone",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No address provided",
    });
  }

  geocode(req.query.address, (err, data) => {
    if (err) {
      return res.send({ error: "No address provided" });
    }

    geocode(req.query.address, (err, data) => {
      if (err) {
        return res.send({ error: err });
      }
      forecast(data.latitude, data.longitude, (forecastErr, forecastData) => {
        if (forecastErr) {
          return res.send({ error: forecastErr });
        }

        res.send({
          forecast: forecastData,
          location: data.location,
          address: req.query.address,
        });
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Not Found",
    name: "Vladone",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Not Found",
    name: "Vladone",
    errorMessage: "Page not found.",
  });
});

app.listen(PORT, () => {
  console.log("Server is up on port 3000.");
});
