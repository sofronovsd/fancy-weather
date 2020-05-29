import React from "react";
import Moment from "react-moment";
import weatherMap from "../utils/weatherMap";

export default function Forecast({language, forecast, isC}) {
    return (
        <div className="forecast-container">
            {forecast.map((day, index) => {
                return <div className="forecast-container__item" key={index}>
                    <img
                        className="icon icon_secondary"
                        src={day.weather_code && weatherMap[day.weather_code.value]}
                        alt="weather-icon"
                    />
                    <p className="text text__medium">
                        <Moment
                            locale={language}
                            date={day.observation_time.value}
                            format="dddd"
                        />
                    </p>
                    <p className="text">
                        {`${isC ? Math.floor((day.temp[0].min.value + day.temp[1].max.value) / 2) :
                            Math.floor((((day.temp[0].min.value + day.temp[1].max.value) / 2) * 9) / 5 + 32)}`}
                        <sup>&deg;{isC ? 'C' : 'F'}</sup>
                    </p>
                </div>
            })}
        </div>
    )
}
