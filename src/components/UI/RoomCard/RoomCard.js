import React, { Component } from 'react';
import './RoomCard.scss'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context';
import Popup from "reactjs-popup";
import DetailsRoom from '../Details/RoomDetails/DetailsRoom';

class RoomCard extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
    }
  }
  render() {
    return <div className="room-card">
      <div className="room-details">
        <p>Linked to: {this.props.room.tourist_name != " " ? this.props.room.tourist_name : "Not affected"}  </p>
        <p>Device Imei: {this.props.room.device_imei}</p>
        <p>Room Number: {this.props.room.room_number}</p>
      </div>
      <div className="room-button">
        <div ><DetailsRoom detail={this.props.room} /></div>
        <Link to={'/edit/room/' + this.props.room.id}>
          <button>Edit</button>
        </Link>

        <Popup trigger={<div ><img src="/img/ui/supprimer.png" /></div>} modal>
          {close => (
            <div className="actions">
              {this.props.room.linked_to_device == 1 ?
                <div className="notif_message">
                  <p>This room is attached to a device.</p>
                  <p>You must remove the link to complete the process.</p>
                </div>
                :
                <>
                  <p className="header" style={{ marginBottom: "15px" }} > Are you sure to delete this room ? </p>
                  <div className="button_actions">
                    <img src="/img/ui/btn_valider.png" onClick={() => { close(); this.props.onDelete(this.props.room.id, this.props.room.hotel_id) }} />
                    <img src="/img/ui/btn_annuler.png" onClick={() => { close(); }} />

                  </div>
                </>
              }


            </div>
          )}
        </Popup>
      </div>
    </div >
  }
}
RoomCard.contextType = UserContext

export default RoomCard;
