import React, { Component } from 'react';
import './Switch.scss';
import { callApi } from '../../../../Helpers'

class Switcher extends Component {

  constructor(props) {
    super(props)
    this.state = {
      check: this.props.check,

    }
  }



  render() {
    return (

      <div className="flipswitch">
        <input type="checkbox" name="flipswitch" className="flipswitch-cb" checked={this.state.check} />
        <label onClick={() => { this.props.setCheck() }} className="flipswitch-label">
          <div className="flipswitch-inner"></div>
          <div className="flipswitch-switch"></div>
        </label>
      </div>
    );
  }
}

export default Switcher;
