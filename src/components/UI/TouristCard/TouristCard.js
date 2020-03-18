import React, { Component } from 'react';
import './TouristCard.scss'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context';
import Popup from "reactjs-popup";
import { callApi } from '../../../Helpers';
import DetailsGuest from '../Details/DetailsGuest';

class DeviceCard extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }
  async onDelete(id) {

    let x = await callApi('guest/' + id, 'DELETE')
  }

  render() {

    return <div className="tourist-card">
      <div className="tourist-details">
        <p>Guest: {this.props.tourist.first_name} {this.props.tourist.last_name} </p>
        <p>Room: {this.props.tourist.stay.device_room.room.room_number} </p>
      </div>
      <div className="tourist-button">
        <div ><DetailsGuest detail={this.props.tourist} /></div>
        <Link to={'/edit/guest/' + this.props.tourist.id}>
          <button> Edit </button>
        </Link>


      </div>
    </div>;
  }
}
DeviceCard.contextType = UserContext

export default DeviceCard;
