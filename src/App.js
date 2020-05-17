import React from 'react';
import {Switch, Route} from 'react-router-dom';
import MovieList from './components/templates/MovieList';
import Detail from "./components/templates/Detail";
import Register from './components/pages/register';
import Signin from './components/pages/signin';
import Default from "./components/templates/Default";
import Landing from './components/pages/landing';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/main" component={MovieList} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Signin} />
        <Route path="/detail/:id" component={Detail} />
        <Route component={Default}/>
      </Switch>
    </React.Fragment>
  );
}

export default App;
