export const requestDailyWeather = ( [latitude, longitude]) => {
    return fetch(`https://api.climacell.co/v3/weather/forecast/daily?lat=${latitude}&lon=${longitude}&start_time=now&unit_system=si&fields=temp%2Cweather_code&apikey=${process.env.REACT_APP_WEATHER_KEY}`)
};

export const requestCurrentWeather = ( [latitude, longitude]) => {
    return fetch(`https://api.climacell.co/v3/weather/realtime?lat=${latitude}&lon=${longitude}&unit_system=si&fields=temp%2Cwind_speed%2Chumidity%2Cfeels_like%2Cweather_code%2Ccloud_cover&apikey=${process.env.REACT_APP_WEATHER_KEY}`)
};
