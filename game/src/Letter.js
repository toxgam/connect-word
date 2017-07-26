import React, {Component} from 'react'
import {Rect, Text, Group} from 'react-konva'

import {backgroundTextColor, textColor, font} from './data'

export default class Letter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      letter: props.letter,
      x: props.x,
      y: props.y,
      size: props.size,
      visible: props.visible
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.letter === this.state.letter) {
      this.setState({visible: nextProps.visible})
    } else {
      this.setState({
        letter: nextProps.letter,
        x: nextProps.x,
        y: nextProps.y,
        size: nextProps.size,
        visible: nextProps.visible
      })
    }
  }

  render() {
    // console.log(this.state.x, this.state.y)
    return (
      <Group x={this.props.x} y={this.props.y} width={this.props.size} height={this.props.size}>
        <Rect
          x={0}
          y={0}
          width={this.state.size}
          height={this.state.size}
          fill={backgroundTextColor}
          stroke={0}
          visible={!this.state.visible}
        />

        <Text
          x={0}
          y={0}
          align="center"
          text={this.state.letter}
          fontFamily={font}
          fontStyle="bold"
          fontSize={this.state.size}
          fill={textColor}
          padding={this.state.size / 5}
          visible={this.state.visible}
        />
      </Group>
    )
  }
}