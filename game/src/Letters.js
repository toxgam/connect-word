import React, {Component} from 'react'
import {Group, Rect, Line} from 'react-konva'

import Piece from './Piece'
import {lineColor} from './data'

const distance = ((a, b) => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
})

const convertEvent = (event) => {
  const e = event
  if (e.evt.x === undefined) {
    e.evt.x = e.evt.changedTouches[0].clientX
    e.evt.y = e.evt.changedTouches[0].clientY
  }
  return e
}

export default class Letters extends Component {
  constructor(props) {
    super(props)

    this.size = Math.min(props.width, props.height) * 0.8
    this.x = this.props.x + (props.width - this.size) / 2
    this.y = this.props.y + (props.height - this.size) /2
    this.r = this.size / 4
    this.length = this.props.letters.length

    this.available = Array(this.length).fill(true)
    this.result = []

    this.state = {
      points: undefined,
      vertices: props.letters.split("").map((e, i) => {return {
        x: this.r * (1 + Math.cos(Math.PI / 2 + 2 * Math.PI * i / this.length)),
        y: this.r * (1 - Math.sin(Math.PI / 2 + 2 * Math.PI * i / this.length)),
        letter: e
      }})
    }
  }

  pieceNumber(x, y) {
    for (let i = 0; i < this.state.vertices.length; i++) {
      if (distance(this.state.vertices[i], {x, y}) <= this.r / 4) {
        return i
      }
    }

    return -1
  }

  drawBegin(event) {
    const e = convertEvent(event)

    const points = []
    this.result.length = 0
    this.available.fill(true)

    const x = (e.evt.x - this.props.absolute.x - (this.props.width - this.size) / 2) / 2
    const y = (e.evt.y - this.props.absolute.y - (this.props.height - this.size) / 2) / 2

    const piece = this.pieceNumber(x, y)
    if (piece === -1) {
      return
    }

    points.push(this.state.vertices[piece].x * 2)
    points.push(this.state.vertices[piece].y * 2)
    this.result.push(piece)
    this.available[piece] = false

    points.push(x * 2)
    points.push(y * 2)

    this.setState({points})
  }

  drawMove(event) {
    const e = convertEvent(event)
    //console.log(e)

    if (this.state.points === undefined) {
      return
    }

    const points = this.state.points

    points.pop()
    points.pop()

    const x = (e.evt.x - this.props.absolute.x - (this.props.width - this.size) / 2) / 2
    const y = (e.evt.y - this.props.absolute.y - (this.props.height - this.size) / 2) / 2
    
    const piece = this.pieceNumber(x, y)
    if (piece !== -1 && piece !== this.result[this.result.length - 1]) {
      if (this.result.length > 1 && piece === this.result[this.result.length - 2]) {
        points.pop()
        points.pop()
        this.available[this.result[this.result.length - 1]] = true
        this.result.pop()
      } else if (this.available[piece]) {
        points.push(this.state.vertices[piece].x * 2)
        points.push(this.state.vertices[piece].y * 2)
        this.result.push(piece)
        this.available[piece] = false
      }
    }

    points.push(x * 2)
    points.push(y * 2)
    
    this.setState({points})
  }

  drawEnd(event) {
    //const e = convertEvent(event)

    if (this.result.length > 0) {
      this.props.update(this.result.map(e => this.props.letters[e]).join(''))
    }
    this.setState({points: undefined, result: undefined})
  }

  componentWillReceiveProps(nextProps) {
    this.length = nextProps.letters.length

    this.state = {
      points: undefined,
      vertices: nextProps.letters.split("").map((e, i) => {return {
        x: this.r * (1 + Math.cos(Math.PI / 2 + 2 * Math.PI * i / this.length)),
        y: this.r * (1 - Math.sin(Math.PI / 2 + 2 * Math.PI * i / this.length)),
        letter: e
      }})
    }
  }

  render() {
    // Weird bug: need to copy points out, otherwise lines are not rendered correctly
    const points = this.state.points ? this.state.points.slice() : []

    return (
      <Group x={this.x} y={this.y} width={this.size} height={this.size}>
        <Line
          points={points}
          tension={0.4}
          lineCap="round"
          lineJoin="round"
          strokeWidth={10}
          stroke={lineColor}
        />

        {this.state.vertices.map((e, i) => <Piece 
          key={i}
          visible={true}
          x={e.x}
          y={e.y}
          size={this.r / 2}
          letter={e.letter}
        />)}

        <Rect
          x={-this.x}
          y={-this.y}
          width={this.props.width}
          height={this.props.height * 2}
          
          onMouseDown={this.drawBegin.bind(this)}
          onTouchStart={this.drawBegin.bind(this)}

          onMouseUp={this.drawEnd.bind(this)}
          onTouchEnd={this.drawEnd.bind(this)}
          
          onMouseMove={this.drawMove.bind(this)}
          onTouchMove={this.drawMove.bind(this)}
        />
      </Group>
    )
  }
}