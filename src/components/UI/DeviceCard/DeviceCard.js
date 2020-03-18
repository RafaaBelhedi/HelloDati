import React, { Component } from 'react';
import './DeviceCard.scss'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context';
import Popup from "reactjs-popup";
import DetailsDevice from '../Details/DeviceDetails/DetailsDevice';

class DeviceCard extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {

    return <div className="device-card">
      <div className="device-details">
        <p>IMEI: {this.props.device.imei}</p>
        <p>Guest: {this.props.device.device_room.stay.tourist.id != null ? this.props.device.device_room.stay.tourist.name : 'Not affected'}</p>
        {this.context.role == 3 && (<><p>Hotel ID: {this.props.device.hotel_id} </p><p> Hotel Name : {this.props.device.hotel.hotel_name}</p></>)}
        <p style={{ color: this.props.device.status == 0 ? 'red' : 'green' }}><span style={{ backgroundColor: this.props.device.status == 0 ? 'red' : 'green' }}></span>   {this.props.device.status == 0 ? 'Inactive' : 'Active'}</p>
      </div>

      <div className="device_buttons">
        <div ><DetailsDevice detail={this.props.device} /></div>
        {this.context.role == 3 && <Link to={'/edit/device/' + this.props.device.id} className="link"><button className="device-button">Edit</button></Link>}
        <div className="popup_confirmation">
          {this.context.role == 3 &&
            <Popup trigger={<img src="/img/ui/supprimer.png" className="trash" />} modal>

              {close => (


                <div className="actions">
                  <p className="header" style={{ marginBottom: "15px" }}> Are you sure to delete this device ? </p>
                  <div className="button_actions">
                    <img src="/img/ui/btn_valider.png" onClick={() => { close(); this.props.onDelete(this.props.device.id, this.props.device.hotel_id) }} />
                    <img src="/img/ui/btn_annuler.png" onClick={() => { close(); }} />
                  </div>
                </div>
              )}
            </Popup>
          }
        </div>
      </div>
    </div>;
  }
}
DeviceCard.contextType = UserContext

export default DeviceCard;
