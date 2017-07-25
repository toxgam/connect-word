import React, {Component} from 'react'
import {Group} from 'react-konva'

import Letter from './Letter'
import {margin} from './data'

export default class Word extends Component {
  constructor(props) {
    super(props)

    const size = props.size

    this.verticalMargin = (props.height - size) / 2
    this.outMargin = (props.centerAlign) ? 
      (props.width - size * props.letters.length - size * margin * (props.letters.length)) / 2:
      size * margin

    this.state = {
      x: props.x,
      y: props.y,
      size: size,
      width: props.width,
      height: props.height,
      letters: props.letters,
      visible: props.visible
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({visible: nextProps.visible})
  }

  render() {
    console.log("Word")
    console.log(this.verticalMargin, this.outMargin)
    return (
      <Group x={this.state.x} y={this.state.y} width={this.state.width} height={this.state.height}>
        {Array.prototype.map.call(this.state.letters, ((e, i) => <Letter 
          key={i}
          visible={this.state.visible}
          x={this.outMargin + i * this.state.size * (1 + margin)}
          y={this.verticalMargin}
          size={this.state.size}
          letter={e}
        />))}
      </Group>
    )
  }
}