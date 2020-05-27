import React from "react";
import Moment from "react-moment";

export default function Forecast({forecast, isC}) {
    return (
        <div className="forecast-container">
            {forecast.map((day, index) => {
                return <div className="forecast-container__item" key={index}>
                    <p className="text text__medium">
                        <Moment
                            date={day.observation_time.value}
                            format="dddd"
                        />
                    </p>
                    <p className="text">
                        {`${isC ? Math.floor((day.temp[0].min.value + day.temp[1].max.value) / 2) :
                            Math.floor((((day.temp[0].min.value + day.temp[1].max.value) / 2) * 9) / 5 + 32)}`}
                        <sup>&deg;{isC ? 'C' : 'F'}</sup>
                        <span>{day.weather_code.value}</span>
                    </p>
                </div>
            })}
        </div>
    )
}