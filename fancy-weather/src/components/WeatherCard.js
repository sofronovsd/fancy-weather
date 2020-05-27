import React from "react";
import {Card} from "react-bootstrap";
import Moment from "react-moment";
import 'moment-timezone';

export default function WeatherCard( { data, isC } ) {
    const temp = data.temp && (isC ? Math.floor(data.temp.value)
        : Math.floor((data.temp.value * 9) / 5 + 32));
    const feelsLike = data.feels_like && (isC ? Math.floor(data.feels_like.value)
        : Math.floor((data.feels_like.value * 9) / 5 + 32));
    return (
        <Card>
            <Card.Body>
                <p className="card__title">{data.place}</p>
                <p className="card__date">
                    <Moment
                        interval={1000}
                        format="dddd DD MMMM HH:mm:ss"
                        tz={data.timezone}
                    />
                </p>
                <div className="flex-container">
                    <p className="card__degree">
                        {temp}
                        <sup>&deg;{isC ? `C` : `F`}</sup>
                    </p>
                    <div className="card__summary text text__medium">
                        <p>{data.weather_code && data.weather_code.value.replace('_', ' ')}</p>
                        <p>Feels like: {feelsLike}<sup>&deg;{isC ? `C` : `F`}</sup></p>
                        <p>Wind: {data.wind_speed && Math.floor(data.wind_speed.value)} m/s</p>
                        <p>Humidity: {data.humidity && Math.floor(data.humidity.value)}%</p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
