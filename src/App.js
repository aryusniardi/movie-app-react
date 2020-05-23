import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Navbar from './components/component/navbar'
import Footer from './components/component/footer'
import MovieList from './components/templates/MovieList';
import Detail from "./components/templates/Detail";
import Register from './components/pages/register';
import Login from './components/pages/login';
import Default from "./components/templates/Default";
import TopRating from './components/pages/topRating';
import './App.scss';

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={TopRating} />
        <Route path="/main" component={MovieList} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/detail/:id" component={Detail} />
        <Route component={Default}/>
      </Switch>
    </React.Fragment>
  );
}

export default App;
