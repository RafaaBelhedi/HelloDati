import React, { Component } from 'react';
import { callApi } from '../../Helpers';
import { UserContext } from '../Context'
import DeviceCard from '../UI/DeviceCard/DeviceCard';
import './Devices.scss'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

class Devices extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      devices: [],
      redirect: false
    }
    this.updateTheState = this.updateTheState.bind(this);
  }

  async componentDidMount() {
    let devices = await callApi('devices', { hotel_id: this.context.hotel_id[0] });
    this.setState({ devices: devices.data })
  }

  async updateTheState(id, hotelId) {
    let result = await callApi('device/' + id, {}, 'DELETE');
    let devices = await callApi('devices', { hotel_id: hotelId });
    this.setState({ devices: devices.data });
    let parameters = {
      title: "Success",
      message: "The device has been successfully deleted",
      type: "success",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 4000,
        onScreen: false
      }
    }
    if (result === 0) {
      parameters['type'] = "danger";
      parameters['title'] = "Error";
      parameters['message'] = "You can't delete this device cause it's linked to device(s)";
    }

    store.addNotification(parameters);
  }


  setWidth() {
    if (this.context.role != 3)
      return '100%';
    else
      return '90%';
  }

  render() {
    if (this.state.redirect)
      return <Redirect to={"/add/device"}></Redirect>
    return <div style={{ justifyContent: 'space-between' }} className="devices-container">
      <ReactNotification />
      <div className='device-header'>
        <p>
          <span></span>{this.state.devices.filter(x => x.status != 0).length} Active Devices
        </p>
        <p>
          <span></span>{this.state.devices.filter(x => x.status == 0).length} Inactive Devices
        </p>
      </div>
      <div className="test">
        <div className='device-search' style={{ width: this.setWidth() }}>
          <p>Search for a device</p>
          <div className='inputs'>
            <input placeholder='IMEI' onChange={(e) => this.setState({ imei: e.target.value })} />
            <input placeholder='Room Number' onChange={(e) => this.setState({ room: e.target.value })} />
            <input placeholder='Customer Name' onChange={(e) => this.setState({ customer: e.target.value })} />
          </div>
        </div>

        {this.context.role == 3 ?
          <div className="lien" onClick={() => this.setState({ redirect: true })} >
            <img src="/img/ui/ajouter_client.png" alt="image" />
            <Link to="/add/device">Add Device</Link>

          </div>

          : ''}
      </div>

      <div className='device-list'>
        {this.state.devices
          .filter(x => new RegExp(this.state.imei).test(x.imei))
          .filter(x => new RegExp(this.state.room).test(x.device_room.room.room_number))
          .filter(x => new RegExp(this.state.customer, 'i').test(x.device_room.stay.tourist.name))
          .map(x => (
            <DeviceCard device={x} onDelete={this.updateTheState} />
          ))
        }
      </div>
    </div>;
  }
}

Devices.contextType = UserContext

export default Devices;
