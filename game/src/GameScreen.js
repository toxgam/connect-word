import React, {Component} from 'react'
import {Group, Rect} from 'react-konva'

//inport views
import Answers from './Answers'
import Letters from './Letters'
import Panel from './Panel'

//import data
import {packages, maxWord, backgroundColor} from './data'
import {games as games0} from './gameKindergartern'
import {games as games1} from './gameGrade1'
import {games as games2} from './gameGrade2'
import {games as games3} from './gameGrade3'
import {games as games4} from './gameGrade4'
import {games as games5} from './gameGrade5'
import {games as games6} from './gameGrade6'
import {games as games7} from './gameGrade7'
import {games as games8} from './gameGrade8'
import {games as games9} from './gameHighSchool'

const games = [games0, games1, games2, games3, games4, games4, games5, games6, games7, games8, games9]

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
  while (count >= 0) {
    if (binarySearch(notAvallable, result) === -1) {
      count--
    }
    result++
  }

  return --result
}

const levelInit = (id) => {
  if (localStorage.getItem("dataCW") === null) {
    localStorage.setItem("dataCW", JSON.stringify([]))
  }

  const dataCW = JSON.parse(localStorage.getItem("dataCW"))

  if (dataCW[id] === undefined || dataCW[id] === null) {
    dataCW[id] = {
      level: 0,
      gamePlayed: []
    }
  }

  let level = dataCW[id].level
  let gamePlayed = dataCW[id].gamePlayed
  // console.log(id)
  // console.log(dataCW)
  while (gamePlayed.length === games[id][level].length) {
    level++
    gamePlayed = []
  }

  const gameNumber = random(games[id][level].length, gamePlayed)

  dataCW[id].level = level
  dataCW[id].gamePlayed = gamePlayed
  localStorage.setItem("dataCW", JSON.stringify(dataCW))

  return [level, gameNumber, gamePlayed.length]
}

const endGame = (id, gameNumber) => {
  const dataCW = JSON.parse(localStorage.getItem("dataCW"))
  const gamePlayed = dataCW[id].gamePlayed

  for (let i = gamePlayed.length - 1; i >= -1; i--) {
    if (i === -1) {
      gamePlayed[0] = gameNumber
    } else if (gamePlayed[i] > gameNumber) {
      gamePlayed[i + 1] = gamePlayed[i]
    } else if (gamePlayed[i] === gameNumber) {
      console.log("Err")
    } else {
      gamePlayed[i] = gameNumber
      break
    }
  }

  dataCW[id].gamePlayed = gamePlayed
  localStorage.setItem("dataCW", JSON.stringify(dataCW))
}

export default class GameScreen extends Component {
  constructor(props) {
    super(props)

    let level, gameNumber, gameNum
    [level, gameNumber, gameNum] = levelInit(props.id)
    // console.log(games)

    const rawGame = games[props.id][level][gameNumber]
    const game = select(rawGame)

    // console.log(game)

    this.state = {
      visibilities: game.answers.map(e => false),
      letters: game.problem,
      answers: game.answers,
      level: level,
      gameNumber: gameNumber,
      gameNum: gameNum,
      maxGameNumber: games[level].length
    }

    this.absolute = {
      x: props.x,
      y: props.y
    }
  }

  init = ((props) => {
    // alert("You Won")

    let level, gameNumber, gameNum
    [level, gameNumber, gameNum] = levelInit(props.id)

    const rawGame = games[props.id][level][gameNumber]
    const game = select(rawGame)

    // console.log(game)

    this.setState({
      visibilities: game.answers.map(e => false),
      letters: game.problem,
      answers: game.answers,
      level: level,
      gameNumber: gameNumber,
      gameNum: gameNum,
      maxGameNumber: games[level].length,
      changed: true
    })
  })

  checkEndGame = (() => {
    if (this.state.visibilities.reduce(((ret, e) => ret && e), true)) {
      endGame(this.props.id, this.state.gameNumber)
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
    
    this.setState({visibilities, changed: false})
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
          changed={this.state.changed}
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
          id={this.props.id}
          level={this.state.level + 1}
          maxLevel={games.length}
          package={packages[this.props.id]}
          gameNumber={this.state.gameNum + 1}
          maxGameNumber={this.state.maxGameNumber}
          width={this.props.width}
          height={this.props.height / 6}
        />
      </Group>
    )
  }
}