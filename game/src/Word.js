import React, {Component} from 'react'
import {Group} from 'react-konva'

import Letter from './Letter'
import {margin} from './data'

export default class Word extends Component {
  constructor(props) {
    super(props)

    this.calculate(props)

    this.state = {
      x: props.x,
      y: props.y,
      size: props.size,
      width: props.width,
      height: props.height,
      letterNumber: props.letterNumber,
      visible: props.visible,
      word: props.word,
      changed:props.changed
    }
  }

  calculate(props) {
    const size = props.size

    this.verticalMargin = (props.height - size) / 2
    this.outMargin = (props.centerAlign) ? 
      (props.width - size * props.letterNumber - size * margin * (props.letterNumber)) / 2:
      size * margin
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.changed) {
      this.setState({
        visible: nextProps.visible, 
        word: nextProps.word,
        changed: nextProps.changed
      })
    } else {
      this.calculate(nextProps)

      this.setState({
        x: nextProps.x,
        y: nextProps.y,
        size: nextProps.size,
        width: nextProps.width,
        height: nextProps.height,
        letterNumber: nextProps.letterNumber,
        visible: nextProps.visible,
        word: nextProps.word,
        changed: nextProps.changed
      })
    }
  }

  Letters() {
    const result = []

    for (let i = 0; i < this.state.letterNumber; i++) {
      result.push(<Letter 
        key={i}
        visible={this.state.visible}
        letter={this.state.word[i]}
        x={this.outMargin + i * this.state.size * (1 + margin)}
        y={this.verticalMargin}
        size={this.state.size}
        changed={this.state.changed}
      />)
    }

    return result
  }

  render() {
    return (
      <Group x={this.state.x} y={this.state.y} width={this.state.width} height={this.state.height}>
        {this.Letters()}
      </Group>
    )
  }
}
