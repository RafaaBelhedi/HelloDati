import React, { Component } from 'react';
import './NavigationBar.scss'
import NextButton from '../NextButton'
import BackButton from '../BackButton'
import NavigationIndexes from '../NavigationIndexes'

class NavigationBar extends Component {

  constructor(props) {
    super(props)

    this.state = { index: 0 }
    this.increment = this.increment.bind(this)
  }

  increment() {
    this.props.increment()
    this.setState({ index: Math.min(this.state.index + 1, this.props.count - 1) })
    if (this.state.index === this.props.count - 1)
      this.props.send()
  }

  render() {
    return <div className="navigation-bar">
      <BackButton decrement={() => { this.props.decrement(); this.setState({ index: Math.max(--this.state.index, 0) }) }}>Back</BackButton>
      <NavigationIndexes index={this.state.index} count={this.props.count}></NavigationIndexes>
      <NextButton increment={this.increment}>{this.state.index === (this.props.count - 1) ? 'Submit' : 'Next'}</NextButton>
    </div>;
  }
}

export default NavigationBar;
