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
            <YMaps query={{lang: 'en_US', apikey: 'a520bd1e-3cdd-4dba-b4c1-d916ea93a8a0'}}>
                <Map style={{width: '100%', height: '300px'}} state={position}/>
            </YMaps>
        </div>
    )

}
