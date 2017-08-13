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
            height={window.innerHeight * 0.9} 
            packageId={parseInt(this.props.match.params.packageId, 10)}
            levelId={parseInt(this.props.match.params.levelId, 10)}
            gameId={parseInt(this.props.match.params.gameId, 10)}
            gameNum={parseInt(this.props.match.params.gameNum, 10)}
          />
        </Layer>
      </Stage>
    )
  }
}
