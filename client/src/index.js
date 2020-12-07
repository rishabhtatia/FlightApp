import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import FavouriteList from './components/FavouriteList/FavouriteList';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/favouritelist">
          <FavouriteList />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
