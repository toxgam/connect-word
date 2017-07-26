import React, {Component} from 'react'
import {Group, Rect} from 'react-konva'

import {maxWord, backgroundColor} from './data'
import Answers from './Answers'
import Letters from './Letters'
import {games as games2} from './gameLength2'
import {games as games3} from './gameLength3'
import {games as games4} from './gameLength4'
import {games as games5} from './gameLength5'
import {games as games6} from './gameLength6'

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

let games = games4

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
        <Rect 
          fill={backgroundColor}
          width={this.props.width} 
          height={this.props.height} 
        />

        <Answers
          x={0}
          y={this.props.height / 6}
          width={this.props.width}
          height={this.props.height / 3}
          words={this.state.answers}
          visibilities={this.state.visibilities}
          checkEndGame={this.checkEndGame.bind(this)}
          maxWordLength={this.state.letters.length}
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