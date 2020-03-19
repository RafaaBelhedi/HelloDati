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
    if (this.props.index == 0) {
      let s = this.props.extra ? "extra_post" : "post"
      callApi(s + '/' + this.state.HiddenId, { state: this.state.postHiddenId ? 0 : 1 }, 'PUT', true)
        .then(val => {
          val.data && this.setState({ postHiddenId: val.data[0].state })
        })
    } else {
      let s = this.props.extra ? "extra_post" : "post"
      callApi(s + '/' + this.props.id, { state: this.state.check ? 0 : 1 }, 'PUT', true)
        .then(val => {
          val.data && this.setState({ check: val.data[0].state })
        })
    }
  }

  async componentDidMount() {
    if (this.props.isSPost == true) {
      let restaurants = await callApi('posts', { parent_id: this.props.parent_id })
      if (restaurants.length > 0) {
        await this.setState({ postHiddenId: restaurants.data[0].state });
        await this.setState({ HiddenId: restaurants.data[0].id });
       }

    } else {
      let post = await callApi("posts", {
        hotel_id: this.context.hotel_id[0],
        parent_id: null
      })
      let services = await callApi("posts", {
        hotel_id: this.context.hotel_id[0],
        parent_id: post.data[0].id
      })
      await this.setState({ postHiddenId: services.data[0].state });
      await this.setState({ HiddenId: services.data[0].id });
    }


  }
  render() {
    return (

      <div className="flipswitch">
        <input type="checkbox" name="flipswitch" className="flipswitch-cb" checked={this.props.index == 0 ? this.state.postHiddenId : this.state.check} />
        <label onClick={() => { this.check() }} className="flipswitch-label">
          <div className="flipswitch-inner"></div>
          {this.state.check == 0 ? <div className="flipswitch-switch" style={{ backgroundColor: "#f58635" }}></div> : <div className="flipswitch-switch" style={{ backgroundColor: "#F7E200" }}></div>}
          {this.props.index == 0 ? this.state.postHiddenId == 0 ? <div className="flipswitch-switch" style={{ backgroundColor: "#f58635" }}></div> : <div className="flipswitch-switch" style={{ backgroundColor: "#F7E200" }}></div> : null}

        </label>
      </div>
    );
  }
}
Switch.contextType = UserContext
export default Switch;
