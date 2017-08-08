import React, {Component} from 'react'
import {Rect, Text, Group} from 'react-konva'

import {backgroundTextColor, textColor, font} from './data'

export default class Letter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      x: props.x,
      y: props.y,
      size: props.size,
      visible: props.visible,
      letter: props.letter
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.changed) {
      this.setState({
        visible: nextProps.visible,
        letter: nextProps.letter
      })
    } else {
      this.setState({
        x: nextProps.x,
        y: nextProps.y,
        size: nextProps.size,
        visible: nextProps.visible
      })
    }
  }

  render() {
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
          x={this.state.letter === "I" ? this.state.size / 4 : 0}
          y={0}
          align="center"
          text={this.state.letter}
          fontFamily={font}
          fontStyle="bold"
          fontSize={this.state.size * 0.8}
          fill={textColor}
          padding={this.state.size / 5}
          visible={this.state.visible}
        />
      </Group>
    )
  }
}