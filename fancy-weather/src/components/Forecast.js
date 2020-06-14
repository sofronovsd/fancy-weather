import React from "react";
import Moment from "react-moment";
import weatherMap from "../utils/weatherMap";
import {getCorrectDegree} from "../utils/helper";

export default function Forecast({language, forecast, isC}) {
    const getAverageTemp = (day) => {
      const minValue = day.temp[0].min.value;
      const maxValue = day.temp[1].max.value;
      const average = Math.floor((minValue + maxValue) / 2);
      return isC ? average : Math.floor((average * 9) / 5 + 32);
    };

    return (
        <div data-testid="forecastContainer" className="forecast-container">
            {forecast.map((day, index) => {
                return <div data-testid={`forecastItem${index}`} className="forecast-container__item" key={index}>
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
                        {getAverageTemp(day)}
                        <sup>{getCorrectDegree(isC)}</sup>
                    </p>
                </div>
            })}
        </div>
    )
}
