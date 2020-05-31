import * as moment from "moment";

export const requestRandomImage = (weather) => {
    const month = +moment().tz(weather.timezone).format('MM');
    const season = month > 2 ? month > 5 ? month > 8 ? month > 11 ? 'winter' : 'autumn' : 'summer' : 'spring' : 'winter';
    const hours = +moment().tz(weather.timezone).format('HH');
    const hoursString = hours > 12 ? `${hours % 12}PM` :`${hours}AM`;

    return fetch(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${weather.place && weather.place},${weather.weather_code && weather.weather_code.value},${season},${hoursString}&client_id=${process.env.REACT_APP_IMAGE_KEY}`,
        {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'SameSite': 'None'
            }
        })
};
