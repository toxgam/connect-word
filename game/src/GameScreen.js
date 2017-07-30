import React, {Component} from 'react'
import {Group, Rect} from 'react-konva'

//inport views
import Answers from './Answers'
import Letters from './Letters'
import Panel from './Panel'

//import data
import {maxWord, backgroundColor} from './data'
import {games as games2} from './gameLength2'
import {games as games3} from './gameLength3'
import {games as games4} from './gameLength4'
import {games as games5} from './gameLength5'
import {games as games6} from './gameLength6'

const games = [games2, games3, games4, games4, games5, games6]

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

const random = (n, notAvallable) => {
  let count = Math.floor(Math.random() * (n - notAvallable.length))

  const binarySearch = (array, e) => {
    let l = 0, r = array.length - 1, result = -1

    while (l <= r) {
      const p = Math.floor((l + r) / 2)

      if (array[p] === e) {
        result = p
        break
      } else if (array[p] < e) {
        l = p + 1
      } else {
        r = p - 1
      }
    }

    return result
  }

  let result = 0
  while (count > 0) {
    if (binarySearch(notAvallable, result) === -1) {
      count--
    }
    result++
  }

  return --result
}

const levelInit = () => {
  if (localStorage.getItem("level") === null || localStorage.getItem("level") === "NaN") {
    localStorage.setItem("level", 0)
    localStorage.setItem("gamePlayed", JSON.stringify([]))
  }

  let level = JSON.parse(localStorage.getItem("level"))
  let gamePlayed = JSON.parse(localStorage.getItem("gamePlayed"))

  if (gamePlayed.length === games[level].length) {
    localStorage.setItem("level", (level + 1))
    level++

    localStorage.setItem("gamePlayed", JSON.stringify([]))
    gamePlayed = []
  }

  const gameNumber = random(games[level].length, gamePlayed)
  for (let i = gamePlayed.length - 1; i >= -1; i--) {
    if (i === -1) {
      gamePlayed[0] = gameNumber
      break
    }

    if (gamePlayed[i] > gameNumber) {
      gamePlayed[i + 1] = gamePlayed[i]
    } else {
      gamePlayed[i] = gameNumber
      break
    }
  }
  localStorage.setItem("gamePlayed", JSON.stringify(gamePlayed))

  return [level, gameNumber]
}

export default class GameScreen extends Component {
  constructor(props) {
    super(props)

    let level, gameNumber
    [level, gameNumber] = levelInit()

    const rawGame = games[level][gameNumber]
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

    let level, gameNumber
    [level, gameNumber] = levelInit()

    const rawGame = games[level][gameNumber]
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

        <Panel
          x={0}
          y={0}
          width={this.props.width}
          height={this.props.height / 6}
        />
      </Group>
    )
  }
}