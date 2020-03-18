import React, { Component } from 'react';

import './MessageMaintenance.scss'
class MessageMaintenance extends Component {
  constructor(props) {
    super(props)
    this.state = {


    }


  }


  render() {
    console.log(this.props.item, "maintenancess")
    console.log(this.props.tourists, "maintenancess")
    
    return <div className="msg-room-container" onClick={() => { this.props.context.setData(this.props.item); this.props.direction('/chat') }}  >
      <div className="logo-msg-room">

        <img src="/img/header/maint.png" style={{ height: "32px", width: "32px" }} alt="maint" />
      </div>
      <div className="message-container">

        {this.props.tourists.map(name => {
          return name.id == this.props.item.sender ?
            <div className="tourist-name"> {name.nom}</div>
            : ""
        })}

        <div className="type-order"> {this.props.item.message} </div>

      </div>
      <div className="time-message"> {this.props.item.time} </div>
    </div>
  }






}
export default MessageMaintenance;
