import React from 'react';
import 'materialize-css'
import ControlPanel from "./components/ControlPanel";

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
                // document.querySelector('body').style.backgroundImage = res.url;
            })
    };

    const divStyle = {
        backgroundImage: `url(${nextImg})`,
        backgroundSize: `100% 100vh`
    };

  return (
    <div className="row background" style={divStyle}>
        <div className="col s6">
            <ControlPanel handleRefresh={handleRefresh}/>
        </div>
        <div className="col s6"/>
    </div>
  );
}

export default App;
