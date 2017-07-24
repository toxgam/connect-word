import React, {Component} from 'react'
import {Group} from 'react-konva'

import {maxWord} from './data'
import Word from './Word'

const col = 2
const row = maxWord / col

export default class Answers extends Component {
  constructor(props) {
    super(props)

    this.cellWidth = props.width / col
    this.cellHeight = props.height / row / 1.5
    this.addY = props.height / 3

    this.n = props.words.length
    this.state = {
      visibilities: props.words.map(e => false)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({visibilities: nextProps.visibilities})
  }

  componentDidUpdate() {
    this.props.checkEndGame()
  }

  render() {
    return (
      <Group x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height}>       
        {this.props.words.map((e, i) => <Word
          key={i}
          x={(i < row) ? 0 : this.cellWidth}
          y={(i % row) * this.cellHeight + this.addY}
          width={this.cellWidth}
          height={this.cellHeight}
          visible={this.state.visibilities[i]}
          letters={this.props.words[i]}
        />)}
      </Group>
    )
  }
}