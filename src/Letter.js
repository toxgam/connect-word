import React, {Component} from 'react'
import {Rect, Text, Group} from 'react-konva'

import {backgroundTextColor, textColor, font} from './data'

export default class Letter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: props.visible
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({visible: nextProps.visible})
  }

  render() {
    return (
      <Group x={this.props.x} y={this.props.y} width={this.props.size} height={this.props.size}>
        <Rect
          x={this.props.x}
          y={this.props.y}
          width={this.props.size}
          height={this.props.size}
          fill={backgroundTextColor}
          stroke={0}
          visible={!this.state.visible}
        />

        <Text
          x={this.props.x}
          y={this.props.y}
          align="center"
          text={this.props.letter}
          fontFamily={font}
          fontStyle="bold"
          fontSize={this.props.size * 1.3}
          fill={textColor}
          padding={this.props.size / 5}
          visible={this.state.visible}
        />
      </Group>
    )
  }
}