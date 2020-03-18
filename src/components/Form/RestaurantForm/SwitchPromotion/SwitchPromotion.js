import React, { Component } from 'react';
import './SwitchPromotion.scss';
import { callApi } from '../../../../Helpers'

class SwitchPromotion extends Component {

  constructor(props) {
    super(props)
    this.state = {
      checkP: this.props.checkP,
    }
  }
  render() {
    console.log(this.props,'ttttff')

    return (

      <div className="flipswitch">
        <input type="checkbox" name="flipswitch" className="flipswitch-cb" checked={this.state.checkP} />
        <label onClick={() => { this.props.setCheckPro() }} className="flipswitch-label">
          <div className="flipswitch-inner"></div>
          <div className="flipswitch-switch"></div>
        </label>
      </div>
    );
  }
}
export default SwitchPromotion;
