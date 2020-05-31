import React, {useEffect} from 'react';
import {Col, Container, Row, Spinner} from "react-bootstrap";
import ControlPanel from "./components/ControlPanel";
import SearchInput from "./components/SearchInput";
import WeatherCard from "./components/WeatherCard";
import GeoMap from "./components/GeoMap";
import Forecast from "./components/Forecast";
import {requestCurrentWeather, requestDailyWeather} from "./api/WeatherApi";
import {requestGeoPosition, requestIpInfo} from "./api/GeoPositionApi";
import {requestRandomImage} from "./api/ImageApi";
import MyAlert from "./components/MyAlert";
import localesJson from "./utils/localesJson";
import * as moment from "moment";

function App() {
    const [nextImg, setNextImg] = React.useState('');
    const [weather, setWeather] = React.useState({
      cloud_cover: {value: 0, units: "%"},
      feels_like: {value: 23, units: "C"},
      humidity: {value: 52, units: "%"},
      lat: 53.198627,
      lon: 50.113987,
      observation_time: {value: "2020-05-31T13:59:05.381Z"},
      place: "Samara, Russia",
      temp: {value: 23, units: "C"},
      timezone: "Europe/Samara",
      weather_code: {value: "clear"},
      wind_speed: {value: 7, units: "m/s"}});
    const [coords, setCoords] = React.useState([53.198627,50.113987]);
    const [forecast, setForecast] = React.useState([]);
    const [forecastSpeech, setForecastSpeech] = React.useState({text: ''});
    const [city, setCity] = React.useState('Samara');
    const [loading, setLoading] = React.useState(true);

    const setupAlert = {
        isShow: false,
        text: "test Text"
    };
    const [alert, setAlert] = React.useState(setupAlert);
    const closeAlert = () => {
        const newAlert = {
            isShow: false,
            text: ''
        };
        setAlert(newAlert);
    };

    const storedC = localStorage.getItem('isC');
    const [isC, setC] = React.useState(storedC ? storedC === 'true' : true);

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
            .then(geoPositions => {
                const geoPosition = geoPositions.results[0];
                const place = composePlace(geoPosition);
                const newWeather = Object.assign({}, weather, {place: place});
                setWeather(newWeather);
            });
    };

    const handleRefreshImage = (value) => {
        if (!value.timezone) {
            value = weather;
        }
        return requestRandomImage(value)
            .then(res => res.json())
            .catch(() => showAlert('alertImage'))
            .then(res => {
                setNextImg(res.urls.regular);
                closeAlert();
            })
    };

    useEffect(() => {
        requestIpInfo()
            .then(result => {
                const city = result.city;
                handleSearchClick(city)
                    .then(() => setLoading(false))
            })
    }, []);

    const dynamicBackgroundStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgb(0, 0, 0)), url(${nextImg})`,
        backgroundSize: `100% 100vh`
    };

    const composePlace = (geoPosition) => {
        const city = geoPosition.components.city || geoPosition.components.town || geoPosition.components.county || geoPosition.components.state;
        const country = geoPosition.components.country;
        return `${city}, ${country}`;
    };

    const showAlert = (text, searchValue) => {
        const newAlert = {
            isShow: true,
            text: text
        };
        if (searchValue) {
            newAlert.searchValue = searchValue;
        }
        setAlert(newAlert);
    };

    const handleSearchClick = (searchValue) => {
        return requestGeoPosition(searchValue, language)
            .then(geoPositions => {
                const geoPosition = geoPositions.results[0];
                const place = composePlace(geoPosition);
                const timezone = geoPosition.annotations.timezone.name;
                const coords = [geoPosition.geometry.lat, geoPosition.geometry.lng];
                setCoords(coords);
                requestCurrentWeather(coords)
                    .then(res => res.json())
                    .then(currentWeather => {
                        const updatedCurrentWeather = Object.assign(currentWeather, {
                            place: `${place}`,
                            timezone: `${timezone}`
                        });
                        setWeather(updatedCurrentWeather);
                        return updatedCurrentWeather;
                    })
                    .then((updatedCurrentWeather) =>
                        requestDailyWeather(coords)
                            .then(res => res.json())
                            .then(res => {
                                const forecast = res.slice(1, 4);
                                setForecast(forecast);
                                let speech = 'Прогноз погоды. ';
                                forecast.forEach(day => speech += `День недели: ${moment(day.observation_time.value).locale('ru').format('dddd')}.
                                Погода: ${localesJson[language][day.weather_code.value]}.
                                Средняя температура: ${Math.floor((day.temp[0].min.value + day.temp[1].max.value)/2)} градусов Цельсия . `);
                                setForecastSpeech({text: speech});
                            })
                            .then(() => {
                                handleRefreshImage(updatedCurrentWeather).then(() =>
                                    setCity(searchValue))
                            })
                            .catch(() => showAlert('alertWeather'))
                    )
                    .catch(() => showAlert('alertWeather'))
            })
            .catch(() => showAlert('alertPlace', searchValue))
    };
    return (
        <div>
            {loading ?
                <div className="spinner-container">
                    <Spinner
                        animation="border"
                        variant="primary"
                        className="spinner"
                    />
                </div>
                :
                <Container fluid style={dynamicBackgroundStyle}>
                    <div>
                        <Row>
                            <Col>
                                <ControlPanel
                                    language={language}
                                    isC={isC}
                                    handleRefreshImage={handleRefreshImage}
                                    handleChangeC={handleChangeC}
                                    handleChangeLanguage={handleChangeLanguage}
                                />
                            </Col>
                            <Col lg={4}>
                                <SearchInput
                                    language={language}
                                    handleSearchClick={handleSearchClick}
                                    forecastSpeech={forecastSpeech}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <MyAlert
                                    alert={alert}
                                    closeAlert={closeAlert}
                                    language={language}
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
                    </div>
                </Container>

            }
        </div>
    );
}

export default App;
