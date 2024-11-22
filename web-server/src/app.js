const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

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
  res.send({
    forecast: "",
    location: "",
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

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
