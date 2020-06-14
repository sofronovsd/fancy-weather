import React from "react";
import {Card} from "react-bootstrap";
import Moment from "react-moment";
import 'moment-timezone';
import weatherMap from "../utils/weatherMap";
import * as moment from "moment";
import localesJson from "../utils/localesJson";
import {getCorrectDegree} from "../utils/helper";

export default function WeatherCard({language, data, isC}) {
    const temp = data && data.temp && (isC ? Math.floor(data.temp.value)
        : Math.floor((data.temp.value * 9) / 5 + 32));
    const feelsLike = data && data.feels_like && (isC ? Math.floor(data.feels_like.value)
        : Math.floor((data.feels_like.value * 9) / 5 + 32));

    let iconSrc;
    if (data && data.weather_code) {
        const hours = +moment().tz(data.timezone).format('HH');
        let value = data.weather_code.value;
        if ((value === 'clear' || value === 'mostly_clear') && (hours >= 22 || hours <= 6)) {
            iconSrc = weatherMap.clear_night;
        } else if (value === 'partly_cloudy_day' && (hours >= 22 || hours <= 6)) {
            iconSrc = weatherMap.partly_cloudy_night;
        } else {
            iconSrc = weatherMap[data.weather_code.value];
        }
    }
    return (
        <Card>
            <Card.Body>
                <img
                    className="icon icon_primary"
                    src={iconSrc}
                    alt="weather-icon"
                />
                <p className="card__title">{data && data.place}</p>
                <p className="card__date">
                    <Moment
                        interval={1000}
                        locale={language}
                        format="dddd DD MMMM HH:mm:ss"
                        tz={data && data.timezone}
                    />
                </p>
                <div className="flex-container">
                    <div>
                        <p className="card__degree">
                            {temp}
                            <sup>{getCorrectDegree(isC)}</sup>
                        </p>
                    </div>
                    <div className="card__summary text text__medium">
                        <p>{data && data.weather_code && localesJson[language.toUpperCase()][data.weather_code.value]}</p>
                        <p>{localesJson[language.toUpperCase()].feelsLike}: {feelsLike}<sup>{getCorrectDegree(isC)}</sup>
                        </p>
                        <p>{localesJson[language.toUpperCase()].wind}: {data && data.wind_speed && Math.floor(data.wind_speed.value)} m/s</p>
                        <p>{localesJson[language.toUpperCase()].humidity}: {data && data.humidity && Math.floor(data.humidity.value)}%</p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
