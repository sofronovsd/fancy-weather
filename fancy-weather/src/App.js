import React, {useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import ControlPanel from "./components/ControlPanel";
import SearchInput from "./components/SearchInput";
import WeatherCard from "./components/WeatherCard";
import GeoMap from "./components/GeoMap";

function App() {
    const [nextImg, setNextImg] = React.useState('');
    const [weather, setWeather] = React.useState({});
    const [coords, setCoords] = React.useState({});

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
                console.log(res);
                setNextImg(res.urls.full);
            });

        navigator.geolocation.getCurrentPosition(res => {
            console.log(res);
            requestCurrentWeather(res.coords)
                .then(result => {
                    console.log(result);
                    setWeather(result);
                    setCoords(result);
                });
        }, err => console.log(err))

    };

    const requestCurrentWeather = (coords) => {
        return fetch(`https://api.climacell.co/v3/weather/realtime?lat=${coords.latitude}&lon=${coords.longitude}unit_system=si&fields=temp%2Cwind_speed%2Chumidity%2Cfeels_like%2Cweather_code%2Ccloud_cover&apikey=5eLH5MVtbKUKu2JKcwXdLq37V0TgyXKJ`)
            .then(res => res.json())
    };

    useEffect(() => {
        // requestCurrentWeather()
        //     .then(result => {
        //         console.log(result);
        //         setWeather(result)
        //     });
    }, []);

    const divStyle = {
        backgroundImage: `url(${nextImg})`,
        backgroundSize: `100% 100vh`
    };

    return (
        <Container fluid style={divStyle}>
            <Row>
                <Col>
                    <ControlPanel handleRefresh={handleRefresh}/>
                </Col>
                <Col lg={4}>
                    <SearchInput/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <WeatherCard data={weather}/>
                </Col>
                <Col lg={4}>
                    <GeoMap coords={coords}/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
