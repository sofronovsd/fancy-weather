import React from "react";
import {Card} from "react-bootstrap";
import Moment from "react-moment";

export default function WeatherCard( { data } ) {
    return (
        <Card>
            <Card.Body>
                <p className="card__title">{data.place}</p>
                <p className="card__date">
                    <Moment
                        interval={1000}
                        date={data.date}
                        format="dddd DD MMMM HH:mm:ss"
                    />
                </p>
                <div style={{display: 'flex'}}>
                    <p className="card__degree">{data.temp && data.temp.value}&deg;</p>
                    <div className="card__summary">
                        <p>{data.weather_code && data.weather_code.value.replace('_', ' ')}</p>
                        <p>Feels like: {data.feels_like && data.feels_like.value}&deg;</p>
                        <p>Wind: {data.wind_speed && data.wind_speed.value} m/s</p>
                        <p>Humidity: {data.humidity && data.humidity.value}%</p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
