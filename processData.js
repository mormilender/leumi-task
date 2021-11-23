//getting the relevant fields
const filterFields = (forecast) => {
    return forecast.list.map(item => ({
        date: new Date(item.dt_txt).getDate(),
        max_tmp: item.main.temp_max,
        min_tmp: item.main.temp_min,
        weather: item.weather[0].main
    }));
}

const groupByDate = (forecastSummary) => {
    return forecastSummary.reduce((r, a) => {
        r[a.date] = r[a.date] || [];
        r[a.date].push(a);
        return r;
    }, Object.create(null));
}

//fitering the wanted results per day
const filterFieldsByDay = (daysForecast, data, cityName) => {
    const keys = Object.keys(daysForecast);
    keys.forEach((key) => {
        //first time
        if (!data.hasOwnProperty(key)) {
            data[key] = {
                max: {},
                min: {},
                rain: []
            };
            data[key].max.temp = Math.max.apply(Math, daysForecast[key].map((item) => { return item.max_tmp; }));
            data[key].max.city = cityName;
            data[key].min.temp = Math.min.apply(Math, daysForecast[key].map((item) => { return item.min_tmp; }));
            data[key].min.city = cityName;

        }
        else {
            let prevCityTemp = data[key].max.temp;
            let newCityTemp = Math.max.apply(Math, daysForecast[key].map((item) => { return item.max_tmp; }));
            data[key].max.temp = Math.max(prevCityTemp, newCityTemp);
            if (prevCityTemp < newCityTemp) data[key].max.city = cityName;

            prevCityTemp = data[key].min.temp;
            newCityTemp = Math.min.apply(Math, daysForecast[key].map((item) => { return item.min_tmp; }));
            data[key].min.temp = Math.min(prevCityTemp, newCityTemp);
            if (prevCityTemp > newCityTemp) data[key].min.city = cityName;

        }

        if (daysForecast[key].some(field => field.weather === "Rain")) {
            data[key].rain.push(cityName);
        }
    });

}


const organizeData = (forecasts) => {
    let data = [];
    forecasts.forEach(forecast => {
        let forecastSummary = filterFields(forecast);
        let daysForecast = groupByDate(forecastSummary, data)
        filterFieldsByDay(daysForecast, data, forecast.city.name);
    })
    return data;
}

module.exports.organizeData = organizeData;






