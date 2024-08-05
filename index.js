const fetch = require("node-fetch");
async function getWeatherData(city) {
  const weatherURL = `https://api.weatherstack.com/current?access_key=e571905e23dd8d14fe036f2c101b2519&query=${city}`;
  try {
    const response = await fetch(weatherURL);
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.log("Error fetching weather data:", error);
    throw error;
  }
}

getWeatherData("Mumbai")
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
const express = require("express");

const app = express();
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/weather", async (req, res) => {
  const city = req.query.city;
  try {
    const weatherData = await getWeatherData(city);
    res.render("index", { weather: weatherData });
  } catch (error) {
    res.status(500).send("Error fetching weather data.");
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Weather app is running on port ${PORT}`);
});
