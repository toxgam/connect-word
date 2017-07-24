import React, {Component} from 'react'
import {Text, Group} from 'react-konva'

import {textColor, font} from './data'

export default class Piece extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: props.visible,
      letter: props.letter
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({visible: nextProps.visible,letter: nextProps.letter})
  }

  render() {
      const fontSize = this.props.size * 1.25

    return (
      <Group x={this.props.x} y={this.props.y} width={this.props.size} height={this.props.size}>
        <Text
          x={this.props.x - fontSize / 2}
          y={this.props.y - fontSize / 2}
          text={this.state.letter}
          fontStyle="bold"
          fontFamily={font}
          fontSize={fontSize}
          fill={textColor}
          padding={this.props.size / 5}
          visible={this.state.visible}
        />
      </Group>
    )
  }
}