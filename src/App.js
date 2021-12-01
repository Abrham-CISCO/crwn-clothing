import React from 'react';
//import { Route, Switch } from 'react-router';
import {Route, Routes} from 'react-router-dom'
import './App.css';
import HomePage from './pages/homepage/homepage.component'
function App() {
  return (
    <div>
      {/* <Routes>
        <Route  path = "/" component={HomePage}/>
      </Routes> */}
      <HomePage/>
    </div>
  );
}

export default App;
