import React, {useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import ControlPanel from "./components/ControlPanel";
import SearchInput from "./components/SearchInput";
import WeatherCard from "./components/WeatherCard";
import GeoMap from "./components/GeoMap";
import Forecast from "./components/Forecast";
import {requestCurrentWeather, requestDailyWeather} from "./api/WeatherApi";
import {requestGeoPosition, requestIpInfo} from "./api/GeoPositionApi";
import {requestRandomImage} from "./api/ImageApi";

function App() {
    const [nextImg, setNextImg] = React.useState('');
    const [weather, setWeather] = React.useState({});
    const [coords, setCoords] = React.useState(null);
    const [forecast, setForecast] = React.useState([]);
    const [city, setCity] = React.useState('Samara');

    const storedC = localStorage.getItem('isC');
    const [isC, setC] = React.useState(storedC === 'true');

    const handleChangeC = (target) => {
        setC(target.getAttribute('data') === 'true');
        localStorage.setItem('isC', target.getAttribute('data'));
    };

    const storedLanguage = localStorage.getItem('lang');
    const [language, setLanguage] = React.useState(storedLanguage || 'EN');

    const handleChangeLanguage = (value) => {
        localStorage.setItem('lang', value);
        setLanguage(value);
        requestGeoPosition(city, value)
            .then(res => {
                const result = res.results[0];
                const place = result.formatted;
                // const place = `${result.components.city ? result.components.city : result.components.state}, ${result.components.country}`;
                const newWeather = Object.assign({}, weather, {place: place});
                setWeather(newWeather);
            });
    };

    const handleRefresh = () => {
        requestRandomImage(weather)
            .then(res => {
                setNextImg(res.urls.regular);
            });

        // requestPosition()
        //     .then(geoPosition => {
        //         const geoParams = geoPosition.loc.split(',');
        //         setCoords(geoParams);
        //         requestCurrentWeather(geoParams)
        //             .then(result => {
        //                 Object.assign(result, {place: `${geoPosition.state}, ${geoPosition.country}`});
        //                 console.log(result);
        //                 setWeather(result);
        //             });
        //     })

    };

    useEffect(() => {
        requestIpInfo()
            .then(result => {
                const city = result.city;
                setCity(city);
                requestGeoPosition(city, language)
                    .then(result => {
                        console.log(result);
                    })
            })
    }, []);

    const dynamicBackgroundStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgb(0, 0, 0)), url(${nextImg})`,
        backgroundSize: `100% 100vh`
    };

    const handleSearchClick = (value) => {
        setCity(value);
        requestGeoPosition(value, language)
            .then(res => {
                const result = res.results[0];
                console.log(result);
                const place = result.formatted;
                // const place = `${result.components.city ? result.components.city : result.components.state}, ${result.components.country}`;
                const timezone = result.annotations.timezone.name;
                const coords = [result.geometry.lat, result.geometry.lng];
                setCoords(coords);
                requestCurrentWeather(coords)
                    .then(result => {
                        Object.assign(result, {place: `${place}`, timezone: `${timezone}`});
                        setWeather(result);
                    })
                    .then(() =>
                        requestDailyWeather(coords)
                            .then(res => {
                                const forecast = res.slice(1, 4);
                                setForecast(forecast);
                            })
                    );
            })
            .catch(err => console.log(err))
    };

    return (
        <Container fluid style={dynamicBackgroundStyle}>
            <Row>
                <Col>
                    <ControlPanel
                        language={language}
                        isC={isC}
                        handleRefresh={handleRefresh}
                        handleChangeC={handleChangeC}
                        handleChangeLanguage={handleChangeLanguage}
                    />
                </Col>
                <Col lg={4}>
                    <SearchInput
                        language={language}
                        handleSearchClick={handleSearchClick}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <WeatherCard
                        language={language}
                        data={weather}
                        isC={isC}
                    />
                    <Forecast
                        language={language}
                        forecast={forecast}
                        isC={isC}
                    />
                </Col>
                <Col lg={4}>
                    <GeoMap
                        language={language}
                        coords={coords}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
