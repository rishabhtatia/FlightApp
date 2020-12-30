import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import FavouriteList from './components/FavouriteList/FavouriteList';
import NotFound from './components/NotFound/NotFound';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/favouritelist" component={FavouriteList}></Route>
        <Route exact path="/" component={App}></Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
