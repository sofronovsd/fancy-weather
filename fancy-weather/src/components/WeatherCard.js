import React from "react";
import {Card} from "react-bootstrap";

export default function WeatherCard() {
    return (
        <Card>
            <Card.Body>
                <h2>Country, Town</h2>
                <p>Date</p>
                <div style={{display: 'flex'}}>
                    <h1>10&deg;</h1>
                    <div>
                        <p>Overcast</p>
                        <p>Feels like: 7&deg;</p>
                        <p>Wind: 2 m/s</p>
                        <p>Humidity: 83%</p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
