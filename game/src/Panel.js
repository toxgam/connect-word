import React, {Component} from 'react'
import {Group, Text, Image} from 'react-konva'

import {textColor} from './data'
import {levelInit} from './levelRoute'

export default class Panel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      backImage: undefined,
      randomImage: undefined,
      packageName: this.props.packageName,
      packageId: this.props.packageId,
      gameNumber: this.props.gameNumber,
      maxGameNumber: this.props.maxGameNumber
    }
  }

  componentWillMount() {
    const backImage = new window.Image()
    backImage.src = "./back.svg"
    backImage.onload = () => {
      this.setState({backImage: backImage})
    }
    
    const randomImage = new window.Image()
    randomImage.src = "./random.svg"
    randomImage.onload = () => {
      this.setState({randomImage: randomImage})
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      gameNumber: nextProps.gameNumber,
      maxGameNumber: nextProps.maxGameNumber
    })
  }

  backHandle(e) {
    window.location = '#/'
  }

  randomHandle(e) {
    let levelId, gameId, gameNum
    [levelId, gameId, gameNum] = levelInit(this.state.packageId)
    window.location = `#/${this.state.packageId}/${levelId}/${gameId}/${gameNum}`
  }

  render() {
    const size = Math.min(this.props.width, this.props.height) / 2

    return (
      <Group x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height}>
        <Image 
          x={0}
          y={0}
          width={size}
          height={size}
          image={this.state.backImage}
          onTouchStart={this.backHandle.bind(this)}
        />

        <Text 
          x={size}
          y={this.props.height / 8}
          width={this.props.width - 2 * size}
          height={this.props.height / 3}
          text={this.state.packageName}
          fontSize={size / 2}
          align="center"
          fill={textColor}
        />

        <Text 
          x={size}
          y={this.props.height * 2 / 3 - this.props.height / 8}
          width={this.props.width - 2 * size}
          height={this.props.height / 3}
          text={"Game " + this.state.gameNumber + "/" + this.state.maxGameNumber}
          fontSize={size / 2}
          align="center"
          fill={textColor}
        />

        <Image 
          x={this.props.width - size}
          y={0}
          width={size}
          height={size}
          image={this.state.randomImage}
          onTouchStart={this.randomHandle.bind(this)}
        />
      </Group>
    )
  }
}