import React, {Component} from 'react'
import {Group, Rect} from 'react-konva'

import {maxWord} from './data'
import Answers from './Answers'
import Letters from './Letters'
import {games} from './games'

const select = (rawGame => {
  const game = rawGame

  const n = game.answers.length

  const comp = ((a, b) => {
    return (a.length < b.length || (a.length === b.length && a < b)) ? -1 : 1
  })

  game.answers.sort(comp)

  if (n > maxWord) {
    game.answers = game.answers.slice(n - maxWord, n)
  } 

  return game
})

export default class GameScreen extends Component {
  constructor(props) {
    super(props)

    const rawGame = games[Math.floor(Math.random() * games.length)]
    const game = select(rawGame)

    console.log(game)

    this.state = {
      visibilities: game.answers.map(e => false),
      letters: game.problem,
      answers: game.answers
    }

    this.absolute = {
      x: props.x,
      y: props.y
    }
  }

  init = ((props) => {
    alert("You Won")

    const rawGame = games[Math.floor(Math.random() * games.length)]
    const game = select(rawGame)

    console.log(game)

    this.setState({
      visibilities: game.answers.map(e => false),
      letters: game.problem,
      answers: game.answers
    })
  })

  checkEndGame = (() => {
    if (this.state.visibilities.reduce(((ret, e) => ret && e), true)) {
      this.init(this.props)
    }
  })

  update(guess) {
    const visibilities = this.state.visibilities

    for (let i = 0; i < this.state.answers.length; i++) {
      if (guess === this.state.answers[i]) {
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
          words={this.state.answers}
          visibilities={this.state.visibilities}
          checkEndGame={this.checkEndGame.bind(this)}
        />

        <Letters
          x={0}
          y={this.props.height / 2}
          width={this.props.width}
          height={this.props.height / 2}
          letters={this.state.letters}
          absolute={{x: this.absolute.x, y: this.absolute.y + this.props.height / 2}}
          update={this.update.bind(this)}
        />
      </Group>
    )
  }
}