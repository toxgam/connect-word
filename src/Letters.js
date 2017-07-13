import React, {Component} from 'react'
import {Group, Rect, Line} from 'react-konva'

import Piece from './Piece'

const distance = ((a, b) => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
})

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
    
    this.state = {
      points: undefined,
      result: undefined
    }
  }

  pieceNumber(x, y) {
    for (let i = 0; i < this.vertices.length; i++) {
      if (distance(this.vertices[i], {x, y}) <= this.r / 4) {
        return i
      }
    }

    return -1
  }

  onMouseDown(e) {
    const points = []
    const result = []

    const x = (e.evt.x - this.props.absolute.x - (this.props.width - this.size) / 2) / 2
    const y = (e.evt.y - this.props.absolute.y - (this.props.height - this.size) / 2) / 2

    const piece = this.pieceNumber(x, y)
    if (piece === -1) {
      return
    }

    points.push(this.vertices[piece].x * 2 + this.r / 4)
    points.push(this.vertices[piece].y * 2 + this.r / 4)
    result.push(piece)

    points.push(x * 2)
    points.push(y * 2)

    this.setState({points, result})
  }

  onMouseMove(e) {
    if (this.state.points === undefined) {
      return
    }

    const points = this.state.points
    const result = this.state.result

    points.pop()
    points.pop()

    const x = (e.evt.x - this.props.absolute.x - (this.props.width - this.size) / 2) / 2
    const y = (e.evt.y - this.props.absolute.y - (this.props.height - this.size) / 2) / 2
    
    const piece = this.pieceNumber(x, y)
    if (piece !== -1 && piece !== result[result.length - 1]) {
      points.push(this.vertices[piece].x * 2 + this.r / 4)
      points.push(this.vertices[piece].y * 2 + this.r / 4)
      result.push(piece)
    }

    points.push(x * 2)
    points.push(y * 2)
    
    this.setState({points, result})
  }

  onMouseUp(e) {
    this.props.update(this.state.result.map(e => this.props.letters[e]).join(''))

    this.setState({points: undefined, result: undefined})
  }

  render() {
    return (
      <Group x={this.x} y={this.y} width={this.size} height={this.size}>
        
        <Line
          points={this.state.points}
          stroke="brown"
          strokeWidth={3}
          lineCap="round"
          lineJoin="round"
        />

        {this.vertices.map((e, i) => <Piece 
          key={i}
          visible={true}
          x={e.x}
          y={e.y}
          size={this.r / 2}
          letter={e.letter}
        />)}

        <Rect
          width={this.size}
          height={this.size}
          onMouseDown={this.onMouseDown.bind(this)}
          onMouseUp={this.onMouseUp.bind(this)}
          onMouseMove={this.onMouseMove.bind(this)}
        />
      </Group>
    )
  }
}