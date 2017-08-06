
import {games} from './data'

const random = (n, notAvallable) => {
  let count = Math.floor(Math.random() * (n - notAvallable.length))

  let result = 0
  let i = 0
  while (count >= 0) {
    if (notAvallable[i] !== result) {
      count--
    } else {
      i++
    }
    result++
  }

  return --result
}

export const levelInit = (packageId) => {
  if (localStorage.getItem("dataCW") === null) {
    localStorage.setItem("dataCW", JSON.stringify([]))
  }

  const dataCW = JSON.parse(localStorage.getItem("dataCW"))

  if (dataCW[packageId] === undefined || dataCW[packageId] === null) {
    dataCW[packageId] = {
      level: 0,
      gamePlayed: []
    }
  }

  let level = dataCW[packageId].level
  let gamePlayed = dataCW[packageId].gamePlayed

  while (gamePlayed.length === games[packageId][level].length) {
    level++
    gamePlayed = []
  }

  const gameNumber = random(games[packageId][level].length, gamePlayed)

  dataCW[packageId].level = level
  dataCW[packageId].gamePlayed = gamePlayed
  localStorage.setItem("dataCW", JSON.stringify(dataCW))

  return [level, gameNumber, gamePlayed.length]
}