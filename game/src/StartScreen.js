import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'

import {packages} from './data'
import {levelInit} from './levelRoute'

export default class StartScreen extends Component {
  static route = <Route exact path="/" component={StartScreen}/>

  render() {
    return(
      <div className="start_screen outer">
        <div className="middle">
          <div className="header" />

          <Packages />
        </div>
      </div>)
  }
}

class Packages extends Component {
  render() {
    return (
      <div className="inner">
        {packages.map((e, i) => 
          <Package
            key={i}
            id={i}
          />)}
      </div>)
  }
}

const getLink = (packageId) => {
  let levelId, gameId, gameNum
  [levelId, gameId, gameNum] = levelInit(packageId)

  return `/${packageId}/${levelId}/${gameId}/${gameNum}`
}

class Package extends Component {
  render() {
    return (
      <Link className="package" to={getLink(this.props.id)}>{packages[this.props.id]}</Link>
    )
  }
}
