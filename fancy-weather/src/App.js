import React from 'react';
import 'materialize-css'
import ControlPanel from "./components/ControlPanel";

function App() {
  return (
    <div className="row">
        <div className="col s6">
            <ControlPanel/>
        </div>
        <div className="col s6"/>
    </div>
  );
}

export default App;
