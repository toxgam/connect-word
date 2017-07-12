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
          visibilities={this.visibilities}
        />

        <Letters
          x={0}
          y={this.props.height / 2}
          width={this.props.width}
          height={this.props.height / 2}
          letters={this.letters}
        />
      </Group>
    )
  }
}