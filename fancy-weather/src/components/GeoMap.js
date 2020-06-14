import React from "react";
import {Map, Placemark, YMaps} from "react-yandex-maps";
import locales from "../utils/localeMap";
import localesJson from "../utils/localesJson";

export default function GeoMap({language, position}) {
    const getCoordinateString = (value) => {
      return `${Math.floor(value)}°${Math.floor(Math.abs(value) % 1 * 60)}'`
    };
    return (
        <div className="map-container">
            <div className="map-wrapper">
                <YMaps key={language} query={{lang: `${locales[language]}`, apikey: process.env.REACT_APP_MAP_KEY}}>
                    <Map style={{width: '100%', height: '300px'}} state={position}>
                        <Placemark geometry={position.center}/>
                    </Map>
                </YMaps>
            </div>
            <p className="text text__coords">{localesJson[language.toUpperCase()].latitude}: {getCoordinateString(position.center[0])}</p>
            <p className="text text__coords">{localesJson[language.toUpperCase()].longitude}: {getCoordinateString(position.center[1])}</p>
        </div>
    )

}
