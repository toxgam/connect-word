import React, {Component} from 'react'
import {Group, Rect} from 'react-konva'

//inport views
import Answers from './Answers'
import Letters from './Letters'
import Panel from './Panel'

//import data
import {packages, maxWord, backgroundColor, games as allGame} from './data'
import {wordList} from './wordList.js'
import {levelInit} from './levelRoute'

const selectGame = (rawGame => {
  const game = Object.assign({}, rawGame)

  const n = game.answers.length

  const comp = ((a, b) => {
    return (a.length < b.length || (a.length === b.length && a < b)) ? -1 : 1
  })

  game.answers.sort(comp)

  if (n > maxWord) {
    game.answers = game.answers.slice(n - maxWord, n)
  }
  game.answers = game.answers.map(e => e.length)

  return game
})

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
      gamePlayed[i + 1] = gameNumber
      break
    }
  }

  dataCW[id].gamePlayed = gamePlayed
  localStorage.setItem("dataCW", JSON.stringify(dataCW))
}

let games

export default class GameScreen extends Component {
  constructor(props) {
    super(props)
    // console.log(allGame)
    games = allGame[props.packageId][props.levelId]
    this.maxGameNumber = allGame[props.packageId].reduce((sum, value) => sum += value.length, 0)
    const rawGame = games[props.gameId]
    const game = selectGame(rawGame)

    this.state = {
      visibilities: game.answers.map(e => false),
      answers: game.answers.map(e => ""),
      letters: game.problem,
      answerLengths: game.answers,
      gameNumber: props.gameId,
      gameNum: props.gameNum,
      maxGameNumber: this.maxGameNumber
    }

    this.flag = true

    this.absolute = {
      x: props.x,
      y: props.y
    }
  }

  componentWillReceiveProps = (nextProps) => { this.init(nextProps) }

  readRawGame = (gameId) => {
    console.log(games[gameId])
    return games[gameId]
  }

  init = (props) => {
    if (props.levelId !== this.state.levelId || props.packageId !== this.props.packageId) {
      games = allGame[props.packageId][props.levelId]
    }

    const game = selectGame(this.readRawGame(props.gameId))

    this.flag = true

    this.setState({
      visibilities: game.answers.map(e => false),
      answers: game.answers.map(e => ""),
      letters: game.problem,
      answerLengths: game.answers,
      gameNumber: props.gameId,
      gameNum: props.gameNum,
      maxGameNumber: this.maxGameNumber,
      changed: true
    })
  }

  next = (props) => {
    let levelId, gameId, gameNum
    [levelId, gameId, gameNum] = levelInit(props.packageId)
    window.location = `#/${props.packageId}/${levelId}/${gameId}/${gameNum}`
  }

  checkEndGame = () => {
    if (this.flag && this.state.visibilities.reduce(((ret, e) => ret && e), true)) {
      endGame(this.props.packageId, this.state.gameNumber)
      setTimeout(() => {this.next(this.props)}, 1000)
      this.flag = false
    }
  }

  checkAppearance = (guess) => {
    let l = 0
    let r = wordList.length - 1

    while (l <= r) {
      const p = Math.floor((l + r) / 2)

      if (wordList[p] === guess) {
        return true
      } else if (guess < wordList[p]) {
        r = p - 1
      } else {
        l = p + 1
      }
    }

    return false
  }

  checkAvailable = (guess) => {
    for (let i = 0; i < this.state.answers.length; i++) {
      if (this.state.answers[i] === guess) {
        return false
      }
    }

    return true
  }

  update(guess) {
    const visibilities = this.state.visibilities
    const answers = this.state.answers

    for (let i = 0; i < this.state.answers.length; i++) {
      if (guess.length === this.state.answerLengths[i] && !visibilities[i]) {
        if (this.checkAppearance(guess) && this.checkAvailable(guess)) {
          visibilities[i] = true
          answers[i] = guess
        }
        break
      }
    }
    
    this.setState({visibilities, answers, changed: false})
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
          wordLengths={this.state.answerLengths}
          visibilities={this.state.visibilities}
          answers={this.state.answers}
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
          packageName={packages[this.props.packageId]}
          packageId={this.props.packageId}
          gameNumber={this.state.gameNum + 1}
          maxGameNumber={this.state.maxGameNumber}
          width={this.props.width}
          height={this.props.height / 6}
        />
      </Group>
    )
  }
}
