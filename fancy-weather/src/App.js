import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import ControlPanel from "./components/ControlPanel";
import SearchInput from "./components/SearchInput";
import WeatherCard from "./components/WeatherCard";

function App() {
    const [nextImg, setNextImg] = React.useState('');

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
            })
    };

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
                  <WeatherCard/>
              </Col>
              <Col lg={4}>

              </Col>
          </Row>
      </Container>
  );
}

export default App;
