import React, {Component} from 'react'
import {Group, Rect} from 'react-konva'

import {game} from './data'
import Answers from './Answers'
import Letters from './Letters'

export default class GameScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visibilities: game.answers.map(e => false)
    }

    this.letters = game.problem
    this.answers = game.answers
    this.absolute = {
      x: props.x,
      y: props.y
    }
  }

  update(guess) {
    const visibilities = this.state.visibilities

    for (let i = 0; i < this.answers.length; i++) {
      if (guess === this.answers[i]) {
        visibilities[i] = true
        break
      }
    }

    this.setState({visibilities})
  }

  render() {
    return (
      <Group>
        <Rect width={this.props.width} height={this.props.height} stroke='blue' strokeWidth={1} />
        <Answers
          x={0}
          y={0}
          width={this.props.width}
          height={this.props.height / 2}
          words={this.answers}
          visibilities={this.state.visibilities}
        />

        <Letters
          x={0}
          y={this.props.height / 2}
          width={this.props.width}
          height={this.props.height / 2}
          letters={this.letters}
          absolute={{x: this.absolute.x, y: this.absolute.y + this.props.height / 2}}
          update={this.update.bind(this)}
        />
      </Group>
    )
  }
}