import React, { Component } from 'react'
import {Layer, Stage} from 'react-konva'

import GameScreen from './GameScreen'

class App extends Component {
  render() {
    const x = 0
    const y = 0
    const width = window.innerWidth
    const height = window.innerHeight

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
