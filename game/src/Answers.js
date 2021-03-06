import React, {Component} from 'react'
import {Group} from 'react-konva'

import Word from './Word'
import {margin} from './data'

export default class Answers extends Component {
  constructor(props) {
    super(props)

    let size1, size2, size, heights, widths, xs, ys

    [size1, size2, size, heights, widths, xs, ys] = this.init(props)

    this.state = {
      visibilities: props.wordLengths.map(e => false),
      answers: props.answers,
      centerAlign: (size1 > size2),
      wordLengths: props.wordLengths,
      size: size,
      heights: heights,
      widths: widths,
      xs: xs,
      ys: ys,
      changed: props.changed
    }
  }

  init(props) {
    const n = props.wordLengths.length
    const lengths = props.wordLengths
    const middleLength = lengths[Math.floor((lengths.length - 1) / 2)]
    const maxLength = lengths[lengths.length - 1]
    
    const size1 = Math.min(
      props.height / n / (1 + margin * 2),
      props.width / (maxLength + margin * (maxLength + 1))
    )
    
    const size2 = Math.min(
      props.height / Math.floor((n + 1) / 2) / (1 + margin * 2),
      props.width / ((maxLength + margin * (maxLength + 1)) + (middleLength + margin * (middleLength + 1)))
    )
    
    const size = Math.max(size1, size2)
    const heights = []
    const widths = []
    const xs = []
    const ys = []

    if (size1 > size2) {
      for (let i = 0; i < n; i++) {
        widths.push(props.width)
        heights.push(props.height / n)
        xs.push(0)
        ys.push(i * props.height / n)
      }
    } else {
      const widthLeft = props.width * 
        ((middleLength + 1) * margin + size * middleLength) / 
        (((maxLength + 1) * margin + size * maxLength) + (middleLength + 1) * margin + size * middleLength)
      const widthRight = props.width * ((maxLength + 1) * margin + size * maxLength) / 
        (((maxLength + 1) * margin + size * maxLength) + (middleLength + 1) * margin + size * middleLength)

      for (let i = 0; i < Math.floor((n + 1) / 2); i++) {
        widths.push(widthLeft)
        heights.push(props.height / Math.floor((n + 1) / 2))
        xs.push(0)
        ys.push(i * props.height / Math.floor((n + 1) / 2))
      }

      for (let i = Math.floor((n + 1) / 2); i < n; i++) {
        widths.push(widthRight)
        heights.push(props.height / Math.floor((n + 1) / 2))
        xs.push(widthLeft)
        ys.push((i - Math.floor((n + 1) / 2)) * props.height / Math.floor((n + 1) / 2))
      }
    }

    return [size1, size2, size, heights, widths, xs, ys]
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.changed) {
      this.setState({
        visibilities: nextProps.visibilities, 
        answers: nextProps.answers,
        changed: nextProps.changed
      })
    } else {
      let size1, size2, size, heights, widths, xs, ys

      [size1, size2, size, heights, widths, xs, ys] = this.init(nextProps)

      this.setState({
        visibilities: nextProps.wordLengths.map(e => false),
        answers: nextProps.answers,
        centerAlign: (size1 > size2),
        wordLengths: nextProps.wordLengths,
        size: size,
        heights: heights,
        widths: widths,
        xs: xs,
        ys: ys,
        changed: nextProps.changed
      })
    }
  }

  componentDidUpdate() {
    this.props.checkEndGame()
  }

  render() {
    return (
      <Group x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height}>       
        {this.props.wordLengths.map((e, i) => <Word
          key={i}
          x={this.state.xs[i] + this.state.size * margin / 2 * ((this.state.xs[i] === 0) ? -1 : 1)}
          y={this.state.ys[i]}
          size={this.state.size}
          centerAlign={this.state.centerAlign}
          width={this.state.widths[i]}
          height={this.state.heights[i]}
          visible={this.state.visibilities[i]}
          word={this.state.answers[i]}
          letterNumber={this.state.wordLengths[i]}
          changed={this.state.changed}
        />)}
      </Group>
    )
  }
}