import React, { Component } from 'react';
import './Switch.scss'
import { callApi } from '../../../Helpers'

class Switch extends Component {

  constructor(props) {
    super(props)
    this.state = {
      check: this.props.check,
      id: this.props.id,
    }
    this.check = this.check.bind(this)
  }

  check() {
    callApi('post/' + this.state.id, { state: this.state.check ? 0 : 1 }, 'PUT', true)
      .then(val => {
        val.data && this.setState({ check: val.data[0].state === 1 })
      })
    if (this.props.check)
      this.props.check(this.state.check);
  }

  render() {
    return (

      <div className="flipswitch">
        <input type="checkbox" name="flipswitch" className="flipswitch-cb" checked={this.state.check} />
        <label onClick={this.check} className="flipswitch-label">
          <div className="flipswitch-inner"></div>
          <div className="flipswitch-switch"></div>
        </label>
      </div>
    );
  }
}

export default Switch;
