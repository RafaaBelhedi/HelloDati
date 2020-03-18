import React, { Component } from 'react';
import "./FormNavigatorDeux.scss"
import FormPage from '../../UI/FormPage/FormPage'
import NavigationBar from '../../UI/NavigationBar/NavigationBar'

class FormNavigator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      elements: this.props.children,
      index: 0,
    }
    console.log(props, "props")

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
    console.log(this.props.service, "postttfromnavigateur")
    return <div className="form-navigator-hotel">
      <FormPage title={this.state.elements[this.state.index].props.title}>{React.cloneElement(this.state.elements[this.state.index], { service: this.props.service })}</FormPage>
      <NavigationBar send={this.props.send} decrement={this.decrement} index={this.state.index} count={this.state.elements.length} increment={this.increment} />
    </div>;
  }
}

export default FormNavigator;
