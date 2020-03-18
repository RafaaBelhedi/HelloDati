import React, { Component } from 'react';
import "./FormNavigator.scss"
import FormPage from '../FormPageServices/FormPage'
import NavigationBar from '../NavigationBar'
import PreviewModel from '../PreviewModel';

class FormNavigator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      elements: this.props.children,
      index: 0,
    }


    this.decrement = this.decrement.bind(this)
    this.increment = this.increment.bind(this)
  }

  decrement() {
    !this.state.index || this.setState({ index: this.state.index - 1 })
  }
  increment() {
    this.state.index === this.state.elements.length - 1 || this.setState({ index: this.state.index + 1 })
  }

  render() {
    return <div className="form-navigator">
      <FormPage title={this.state.elements[this.state.index].props.title} setData={this.props.setData} id={this.props.id} data={this.props.data}>{React.cloneElement(this.state.elements[this.state.index], { data: this.props.data })}</FormPage>
      <NavigationBar send={this.props.send} decrement={this.decrement} index={this.state.index} count={this.state.elements.length} increment={this.increment} />
    </div>;
  }
}

export default FormNavigator;
