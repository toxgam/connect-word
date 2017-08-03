import React, { Component } from 'react'
import {Layer, Stage} from 'react-konva'
import {Route} from 'react-router-dom'

import GameScreen from './GameScreen'

export default class MainScreen extends Component {
  static route = <Route exact path="/:packageId/:levelId/:gameId/:gameNum" component={MainScreen} />

  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer x={0} y={0}>
          <GameScreen  
            x={0} 
            y={0} 
            width={window.innerWidth} 
            height={window.innerHeight} 
            packageId={this.props.match.params.packageId}
            levelId={this.props.match.params.levelId}
            gameId={this.props.match.params.gameId}
            gameNum={this.props.match.params.gameNum}
          />
        </Layer>
      </Stage>
    )
  }
}
