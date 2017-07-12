import React, {Component} from 'react'
import {Rect, Text, Group} from 'react-konva'

export default class Letter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: props.visible
    }
  }

  render() {
    return (
      <Group x={this.props.x} y={this.props.y} width={this.props.size} height={this.props.size}>
        <Rect
          x={this.props.x}
          y={this.props.y}
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