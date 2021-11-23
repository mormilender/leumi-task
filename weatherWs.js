const fetch = require('node-fetch');
require('dotenv').config();


const apiKey = process.env.API_KEY;

const fetchWeather = (cities) => Promise.all(
    cities.map(city => fetch(process.env.URL.replace("{city}", city).replace("{apiKey}", apiKey)))
).then(responses =>
    Promise.all(responses.map(res => res.json()))
)

module.exports.fetchWeather = fetchWeather;