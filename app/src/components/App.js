import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import logo from '../logo.svg';
import './App.css';
import SearchContainer from '../containers/SearchContainer';
import Topic from './Topic'

class App extends Component {
  render() {
    return (
      <div>
        <div class="navbar">
          <span class="brand">Delve</span>
        </div>
        <Router>
          <div>
            <Route exact path="/" component={SearchContainer}/>
            <Route path="/:topic" component={Topic} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;