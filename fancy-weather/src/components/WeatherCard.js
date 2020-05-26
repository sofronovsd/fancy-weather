import React from "react";
import {Card} from "react-bootstrap";

export default function WeatherCard( { data } ) {
    return (
        <Card>
            <Card.Body>
                <h2>Country, Town</h2>
                <p>{ new Date().toISOString()}</p>
                <div style={{display: 'flex'}}>
                    <h1>{data.temp && data.temp.value}&deg;</h1>
                    <div>
                        <p>{data.cloud_cover && data.cloud_cover.value < 20 ? 'Clear' : 'Overcast'}</p>
                        <p>Feels like: {data.feels_like && data.feels_like.value}&deg;</p>
                        <p>Wind: {data.wind_speed && data.wind_speed.value} m/s</p>
                        <p>Humidity: {data.humidity && data.humidity.value}%</p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
