import React, { Component } from 'react';
import { callApi } from '../../Helpers'
import TopBar from './TopBar'
import BotBar from './BotBar'
import './Header.css'
import { withRouter } from "react-router";
import { UserContext } from '../Context'
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: { image: '' },
      hotel: {},
      services: [],
      backgroundImage: "url(http://apitndati.com/v003/public/uploads/tourist_images/rvpdtaycwU63BNEdIO40GtT2uMtryihSJTPGbaCu.png )"
    }
  }

  async componentDidMount() {
    let post = await callApi("posts", {
      hotel_id: this.props.user.hotel_id[0],
      // hotel_id: this.context.hotel_id[0],
      parent_id: null
    });


    let hotel = await callApi("hotel/" + this.props.user.hotel_id[0])
    // let hotel = await callApi("hotel/" + this.context.hotel_id[0])
    let services = await callApi("posts", {
      hotel_id: this.props.user.hotel_id[0],
      // hotel_id: this.context.hotel_id[0],
      parent_id: post.data[0].id
    });



    await this.setState({ services: services.data[0] })
    await this.setState({ hotel: hotel.data[0] })
    await this.setState({ post: post.data[0] })

  }




  render() {


    return (
      // <header style={{ backgroundImage: this.state.backgroundImage }}>
      <header style={{ backgroundColor: " #111f35 " }}>
        <TopBar changeUser={this.props.changeUser} post={this.state.post} hotel={this.state.hotel} />
        <BotBar hotel={this.state.hotel} post={this.state.post} services={this.state.services} />
      </header>
    )
  }
}
Header.contextType = UserContext
export default withRouter(Header);