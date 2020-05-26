import React, {useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import ControlPanel from "./components/ControlPanel";
import SearchInput from "./components/SearchInput";
import WeatherCard from "./components/WeatherCard";
import GeoMap from "./components/GeoMap";
import Moment from "react-moment";
import Forecast from "./components/Forecast";

function App() {
    const [nextImg, setNextImg] = React.useState('');
    const [weather, setWeather] = React.useState({});
    const [coords, setCoords] = React.useState(null);
    const [isC, setC] = React.useState(true);
    const [forecast, setForecast] = React.useState([]);

    const handleRefresh = () => {
        fetch('https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=IPAyLGzMmb97ehcIJPsqCpDAmIuZwoeUyRYL5uKWvHY',
            {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'SameSite': 'None'
                }
            })
            .then(res => res.json())
            .then(res => {
                setNextImg(res.urls.full);
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

    const requestDailyWeather = ( [latitude, longitude]) => {
        return fetch(`https://api.climacell.co/v3/weather/forecast/daily?lat=${latitude}&lon=${longitude}&start_time=now&unit_system=si&fields=temp%2Cweather_code&apikey=5eLH5MVtbKUKu2JKcwXdLq37V0TgyXKJ`)
            .then(res => res.json())
    };

    const requestCurrentWeather = ( [latitude, longitude]) => {
        return fetch(`https://api.climacell.co/v3/weather/realtime?lat=${latitude}&lon=${longitude}unit_system=si&fields=temp%2Cwind_speed%2Chumidity%2Cfeels_like%2Cweather_code%2Ccloud_cover&apikey=5eLH5MVtbKUKu2JKcwXdLq37V0TgyXKJ`)
            .then(res => res.json())
    };

    const requestPosition = () => {
        return fetch(`https://ipinfo.io/json?token=0b1225981c188c`)
            .then(res => res.json())
    };

    const requestGeoPosition = (place) => {
        return fetch(`https://api.opencagedata.com/geocode/v1/json?q=${place}&key=4b03f4c134e542c8a16851109aa96bd4&pretty=1&language=en&limit=1`)
            .then(res => res.json())
    };

    // useEffect(() => {
    // }, []);

    const divStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgb(0, 0, 0)), url(${nextImg})`,
        backgroundSize: `100% 100vh`
    };

    const handleSearchClick = (value) => {
        requestGeoPosition(value)
            .then(res => {
                const result = res.results[0];
                console.log(result);
                const place = `${result.components.city? result.components.city : result.components.state}, ${result.components.country}`;
                const timezone = result.annotations.timezone.name;
                const coords = [result.geometry.lat, result.geometry.lng];
                requestCurrentWeather(coords)
                    .then(result => {
                        Object.assign(result, {place: `${place}`, timezone: `${timezone}`});
                        console.log(result);
                        setWeather(result);
                        setCoords(coords)
                    })
                    .then(() => {
                        requestDailyWeather(coords)
                            .then(res => {
                                const forecast = res.slice(1,4);
                                setForecast(forecast);
                                console.log(forecast);
                            })
                    });
            })
    };

    const handleChangeC = (target) => {
        target.getAttribute('data') === 'true' ? setC(true) : setC(false);
    };

    return (
        <Container fluid style={divStyle}>
            <Row>
                <Col>
                    <ControlPanel handleRefresh={handleRefresh} handleChangeC={handleChangeC}/>
                </Col>
                <Col lg={4}>
                    <SearchInput handleSearchClick={handleSearchClick}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <WeatherCard data={weather} isC={isC}/>
                    <Forecast forecast={forecast} isC={isC}/>
                </Col>
                <Col lg={4}>
                    <GeoMap coords={coords}/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
