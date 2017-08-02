import React, { Component } from 'react'
import {HashRouter as Router} from 'react-router-dom'

import MainScreen from './MainScreen'
import StartScreen from './StartScreen'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {StartScreen.route}
          {MainScreen.route}
        </div>
      </Router>
    );
  }
}

export default App;
