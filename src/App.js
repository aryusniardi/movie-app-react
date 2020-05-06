import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Navbar from './components/templates/Navbar';
import MovieList from './components/templates/MovieList';
import Detail from "./components/templates/Detail";
import Default from "./components/templates/Default";
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={MovieList} />
        <Route path="/details" component={Detail} />
        <Route component={Default}/>
      </Switch>
    </React.Fragment>
  );
}

export default App;
