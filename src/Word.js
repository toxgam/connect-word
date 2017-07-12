import React, {Component} from 'react'
import {Group} from 'react-konva'

import {maxWordLength} from './data'
import Letter from './Letter'

export default class Word extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: props.visible
    }

    this.n = props.letters.length
    this.cellSize = this.props.width / ((3 * maxWordLength + 1) / 2)
    this.vertivalMargin = (this.props.height - this.cellSize) / 4
    // console.log(this.props.width, this.cellSize)
    // console.log(this.props.height, this.cellSize, this.vertivalMargin)
  }

  render() {
    return (
      <Group x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height}>
        {Array.prototype.map.call(this.props.letters, ((e, i) => <Letter 
          key={i}
          visible={this.state.visible}
          x={this.cellSize / 4 + this.cellSize * i * 3 / 4}
          y={this.vertivalMargin}
          size={this.cellSize}
          letter={e}
        />))}
      </Group>
    )
  }
}