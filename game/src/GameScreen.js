import React, {Component} from 'react'
import {Group, Rect} from 'react-konva'

//inport views
import Answers from './Answers'
import Letters from './Letters'
import Panel from './Panel'

//import data
import {packages, maxWord, backgroundColor, games} from './data'
import {levelInit} from './levelRoute'

const selectGame = (rawGame => {
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

export default class GameScreen extends Component {
  constructor(props) {
    super(props)
    // console.log(props.packageId)
    const rawGame = games[props.packageId][props.levelId][props.gameId]
    const game = selectGame(rawGame)

    this.state = {
      visibilities: game.answers.map(e => false),
      letters: game.problem,
      answers: game.answers,
      level: props.levelId,
      gameNumber: props.gameId,
      gameNum: props.gameNum,
      maxGameNumber: games[props.packageId][props.levelId].length
    }

    this.flag = true

    this.absolute = {
      x: props.x,
      y: props.y
    }
  }

  componentWillReceiveProps(nextProps) {
    this.init(nextProps)
  }

  init = ((props) => {
    const rawGame = games[props.packageId][props.levelId][props.gameId]
    const game = selectGame(rawGame)

    this.flag = true

    this.setState({
      visibilities: game.answers.map(e => false),
      letters: game.problem,
      answers: game.answers,
      level: props.levelId,
      gameNumber: props.gameId,
      gameNum: props.gameNum,
      maxGameNumber: games[props.packageId][props.levelId].length,
      changed: true
    })
  })

  next = (props) => {
    let levelId, gameId, gameNum
    [levelId, gameId, gameNum] = levelInit(props.packageId)
    window.location = `#/${props.packageId}/${levelId}/${gameId}/${gameNum}`
  }

  checkEndGame = (() => {
    if (this.flag && this.state.visibilities.reduce(((ret, e) => ret && e), true)) {
      endGame(this.props.packageId, this.state.gameNumber)
      setTimeout(() => {this.next(this.props)}, 1000)
      this.flag = false
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