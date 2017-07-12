import React, {Component} from 'react'
import {Circle, Text, Group} from 'react-konva'

export default class Piece extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: props.visible
    }
  }

  render() {
    return (
      <Group x={this.props.x} y={this.props.y} width={this.props.size} height={this.props.size}>
        <Circle
          x={this.props.x + this.props.size / 2}
          y={this.props.y + this.props.size / 2}
          width={this.props.size}
          height={this.props.size}
          stroke="black"
          strokeWidth={0.2}
        />

        <Text
          x={this.props.x}
          y={this.props.y}
          text={this.props.letter}
          fontStyle="bold"
          padding={this.props.size / 5}
          visible={this.state.visible}
        />
      </Group>
    )
  }
}