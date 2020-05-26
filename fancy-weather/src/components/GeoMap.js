import React from "react";
import {Map, YMaps} from "react-yandex-maps";

export default function GeoMap({coords}) {
    let position = {
        center: [
            53.241505,
            50.221245
        ],
        zoom: 10
    };
    coords && (position = {
        center: [
            coords[0],
            coords[1]
        ],
        zoom: 10
    });

    return (
        <div className="map-container">
            <div className="map-wrapper">
                <YMaps query={{lang: 'en_US', apikey: 'a520bd1e-3cdd-4dba-b4c1-d916ea93a8a0'}}>
                    <Map style={{width: '100%', height: '300px'}} state={position}/>
                </YMaps>
            </div>
            <p className="text text__coords">Latitude: {`${Math.floor(position.center[0])}°${Math.floor(Math.abs(position.center[0]) % 1 * 60)}\'`}</p>
            <p className="text text__coords">Longitude: {`${Math.floor(position.center[1])}°${Math.floor(Math.abs(position.center[1]) % 1 * 60)}\'`}</p>
        </div>
    )

}
