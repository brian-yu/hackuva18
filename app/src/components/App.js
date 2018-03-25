import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './App.css';
import SearchContainer from '../containers/SearchContainer';
import TopicContainer from '../containers/TopicContainer';
import NavbarContainer from '../containers/NavbarContainer';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <NavbarContainer/>
            <Route exact path="/" component={SearchContainer}/>
            <Route path="/topic/:topic" component={TopicContainer} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;