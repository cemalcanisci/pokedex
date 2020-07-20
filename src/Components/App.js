import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../Assets/App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import List from './Pages/List';
import Header from './Header';
import Detail from './Pages/Detail';
import EmptyData from './EmptyData';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/pokemon/:pokeId">
              <Detail />
            </Route>
            <Route exact path="/pokedex">
              <List />
            </Route>
            <Route exact path="/">
            <List />
          </Route>
            <Route exact>
              <EmptyData type="404" message="404 not found" />
            </Route>
          </Switch>
        </div>

      </Router>
    </div>
  );
}
