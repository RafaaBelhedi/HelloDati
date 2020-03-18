import React, { Component } from 'react';
import './Reservation.scss'
import ReactSVG from 'react-svg';
import { NotifContext } from '../../Context'

class Reservation extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }

  }

  render() {
    console.log(this.context.id, "t hani houniiiiirr")
    console.log(this.context.setId, " mmmrr")
    // console.log(this.props.data,"t hani houniiiii")
    return <div className="reservation-container" onClick={() => { this.context.setId(this.props.reser.id); this.props.direction('/orders'); sessionStorage.setItem('idNotif', this.props.reser.id); this.props.isSeen(this.props.reser.id); }} key={this.props.reser.id} >
      <div className="logo-container">
        {/* <ReactSVG  src="/img/header/reservation.svg"/> */}
        <img src="/img/header/reservation.png" style={{ height: "32px", width: "32px" }} />
      </div>
      <div className="details-container">
        <div className="tourist-name">{this.props.reser.tourist_full_name}</div>
        <div className="type-order"> {this.props.reser.post.title}<span style={{ color: "red" }}>{this.props.reser.qt > 1 ? "(x" + this.props.reser.qt + ")" : ""}</span></div>

      </div>
      <div className="time-container"> 2 min ago </div>
    </div>
  }






}
Reservation.contextType = NotifContext

export default Reservation;
