import * as moment from "moment";

export const requestRandomImage = (weather) => {
    const month = +moment().tz(weather.timezone).format('MM');
    const season = month > 2 ? month > 5 ? month > 8 ? month > 11 ? 'winter' : 'autumn' : 'summer' : 'spring' : 'winter';
    const hours = moment().tz(weather.timezone).format('hhA');

    return fetch(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${weather.place && weather.place},${weather.weather_code && weather.weather_code.value},${season},${hours}&client_id=${process.env.REACT_APP_IMAGE_KEY}`,
        {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'SameSite': 'None'
            }
        })
};
