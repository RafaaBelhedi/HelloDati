import React, { Component } from 'react';
import './Switch.scss';
import { callApi } from '../../../Helpers'
import { UserContext } from '../../Context';
class Switch extends Component {

  constructor(props) {
    super(props)
    this.state = {
      check: this.props.check,
      id: this.props.id,
      postHiddenId: "",
      HiddenId: ""
    }
    this.check = this.check.bind(this)
  }
  check() {
      let s = this.props.extra ? "extra_post" : "post"
      callApi(s + '/' + this.props.id, { state: this.state.check ? 0 : 1 }, 'PUT', true)
        .then(val => {
          val.data && this.setState({ check: val.data[0].state })
        })
  }

  render() {
    return (

      <div className="flipswitch">
        <input type="checkbox" name="flipswitch" className="flipswitch-cb" checked={this.state.check} />

        <label onClick={() => { this.check() }} className="flipswitch-label">
          <div className="flipswitch-inner"></div>
          {this.state.check == 0 ? <div className="flipswitch-switch" style={{ backgroundColor: "#f58635" }}></div> : <div className="flipswitch-switch" style={{ backgroundColor: "#F7E200" }}></div>}
        </label>
      </div>
    );
  }
}
Switch.contextType = UserContext
export default Switch;
