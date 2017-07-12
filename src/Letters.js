import React, {Component} from 'react'
import {Group} from 'react-konva'

import Piece from './Piece'

export default class Letters extends Component {
  constructor(props) {
    super(props)

    this.size = Math.min(props.width, props.height) * 0.8
    this.x = this.props.x + (props.width - this.size) / 2
    this.y = this.props.y + (props.height - this.size) /2
    this.r = this.size / 4

    const c1 = 0.309 * this.r //0.309 = cos(2π / 5)
    const c2 = 0.809 * this.r //0.809 = cos(π / 5)
    const s1 = 0.951 * this.r //0.951 = sin(2π / 5)
    const s2 = 0.588 * this.r //0.588 = sin(4π / 5)

    this.vertices = [
      {x: this.r, y: 0, letter: props.letters[0]},
      {x: this.r - s1, y: this.r - c1, letter: props.letters[1]},
      {x: this.r - s2, y: this.r + c2, letter: props.letters[2]},
      {x: this.r + s2, y: this.r + c2, letter: props.letters[3]},
      {x: this.r + s1, y: this.r - c1, letter: props.letters[4]}
    ]
    console.log(this.size, this.r)
    console.log(this.vertices)
  }

  render() {
    return (
      <Group x={this.x} y={this.y} width={this.size} height={this.size}>
        {this.vertices.map((e, i) => <Piece 
          key={i}
          visible={true}
          x={e.x}
          y={e.y}
          size={this.r / 2}
          letter={e.letter}
        />)}
      </Group>
    )
  }
}