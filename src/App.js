import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Main from './Components/MainPage/Main';
import Pizza from './Components/Form/Pizza';
import Confirm from './Components/Confirm';

function App() {
  return (
    <div className="App">
      <Route exact path ="/">
     <Main />
     </Route>
     <Route exact path ="/pizza">
     <Pizza />
     </Route>
     <Route exact path ="/confirm">
     <Confirm/>
     </Route>
    </div>
  );
}

export default App;
