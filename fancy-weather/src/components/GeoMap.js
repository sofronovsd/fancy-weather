import React from "react";
import {Map, YMaps} from "react-yandex-maps";

export default function GeoMap({coords}) {
    const state = {
        center: [
            coords.lat,
            coords.lon
        ],
        zoom: 9
    };

    return (
        <div style={{borderRadius: '15px', overflow: 'hidden'}}>
            <YMaps query={{lang: 'en_US', apikey: 'a520bd1e-3cdd-4dba-b4c1-d916ea93a8a0'}}>
                <Map style={{width: '100%', height: '300px'}} state={state}/>
            </YMaps>
        </div>
    )

}
