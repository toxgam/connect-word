import React, { Component } from 'react'
import {Layer, Stage} from 'react-konva'

import GameScreen from './GameScreen'

class App extends Component {
  render() {
    const x = window.innerWidth * 0.1
    const y = window.innerHeight * 0.1
    const width = window.innerWidth * 0.8
    const height = window.innerHeight * 0.8

    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer x={x} y={y}>
          <GameScreen  x={x} y={y} width={width} height={height} />
        </Layer>
      </Stage>
    );
  }
}

export default App;
