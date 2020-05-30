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

function App() {
    const [nextImg, setNextImg] = React.useState('');
    const [weather, setWeather] = React.useState({});
    const [coords, setCoords] = React.useState(null);
    const [forecast, setForecast] = React.useState([]);
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
            .then(res => {
                setNextImg(res.urls.regular)
                closeAlert();
            })
            .catch(() => showAlert("Limit of the image requests!"))
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

    const showAlert = (text) => {
        const newAlert = {
            isShow: true,
            text: text
        };
        setAlert(newAlert);
    };

    const handleSearchClick = (value) => {
        setCity(value);
        return requestGeoPosition(value, language)
            .then(geoPositions => {
                const geoPosition = geoPositions.results[0];
                const place = composePlace(geoPosition);
                const timezone = geoPosition.annotations.timezone.name;
                const coords = [geoPosition.geometry.lat, geoPosition.geometry.lng];
                setCoords(coords);
                requestCurrentWeather(coords)
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
                            .then(res => {
                                const forecast = res.slice(1, 4);
                                setForecast(forecast);
                            })
                            .then(() => handleRefreshImage(updatedCurrentWeather))
                            .catch(() => showAlert("Limit of the weather requests!"))
                    )
                    .catch(() => showAlert("Limit of the weather requests!"))
            })
            .catch(() => showAlert(`Can't find this place: ${value}!`))
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
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <MyAlert
                                    alert={alert}
                                    closeAlert={closeAlert}
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
