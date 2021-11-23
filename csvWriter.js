const createCsvWriter = require('csv-writer').createObjectCsvWriter;
require('dotenv').config();

const csvWriter = createCsvWriter({
    path: process.env.FILE_PATH,
    header: [
        { id: 'day', title: 'Day' },
        { id: 'highestTemp', title: 'City with highest temp' },
        { id: 'lowestTemp', title: 'City with lowest temp' },
        { id: 'rainedCities', title: 'Cities with rain' },
    ]
});

const writeToFile = (data) => {
    let resultForCsv = [];

    const keys = Object.keys(data);
    keys.forEach((key) => {
        let dayWeather = {
            day: key,
            highestTemp: data[key].max.city,
            lowestTemp: data[key].min.city,
            rainedCities: data[key].rain
        };

        resultForCsv.push(dayWeather)
    });

    csvWriter
        .writeRecords(resultForCsv)
        .then(() => console.log('The CSV file was written successfully'));
}


module.exports.writeToFile = writeToFile;