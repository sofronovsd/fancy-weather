import * as moment from "moment";

export const requestRandomImage = (weather) => {
    const date = +moment().tz(weather.timezone).format('MM');
    const season = date > 2 ? date > 5 ? date > 8 ? date > 11 ? 'winter' : 'autumn' : 'summer' : 'spring' : 'winter';
    const hours = +moment().tz(weather.timezone).format('HH');
    const hoursString = hours > 12 ? `${hours % 12}PM` :`${hours}AM`;

    return fetch(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${weather.place && weather.place},${weather.weather_code && weather.weather_code.value},${season},${hoursString}&client_id=IPAyLGzMmb97ehcIJPsqCpDAmIuZwoeUyRYL5uKWvHY`,
        {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'SameSite': 'None'
            }
        })
};
