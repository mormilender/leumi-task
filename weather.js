const api = require('./weatherWs');
const csv = require('./csvWriter');
const processData = require('./processData');

const cities = process.env.CITIES.split(", ");

const createCsvFile = (forecasts) => {
    const data = processData.organizeData(forecasts);
    csv.writeToFile(data);
}

api.fetchWeather(cities)
    .then(forecasts => createCsvFile(forecasts))
    .catch(err => console.log(err));






