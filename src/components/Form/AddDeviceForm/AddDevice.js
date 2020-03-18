import React, { Component } from 'react';
import FormNavigator from './FormNavigator';
import AddDeviceUn from './AddDeviceUn'
import AddDeviceDeux from './AddDeviceDeux'
import { callApi } from '../../../Helpers';
import { UserContext } from '../../Context'

class AddDevice extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      device: {},
      alert_message: [],
      sucess_message: '',

    }
    this.setData = this.setData.bind(this)
    this.send = this.send.bind(this)

  }

  setData(device) {
    this.setState({ device: { ...this.state.device, ...device } })
  }


  async send() {
    await this.setState({ alert_message: [] })

    if (!/^[a-zA-Z0-9_.-]*$/.test(this.state.device.imei)) {
      this.setState({ alert_message: [...this.state.alert_message, "Invalid imei!"] })
    }

    if (!/^[0-9]*$/.test(this.state.device.call_time)) {
      this.setState({ alert_message: [...this.state.alert_message, "Invalid call_time!"] })
    }

    if (!/^[0-9]*$/.test(this.state.device.call_limit)) {
      this.setState({ alert_message: [...this.state.alert_message, "Invalid call_limit!"] })
    }

    if (!/^[0-9]*$/.test(this.state.device.number)) {
      this.setState({ alert_message: [...this.state.alert_message, "Invalid number!"] })
    }

    if (!/[a-z]{1,10}/.test(this.state.device.phone)) {
      this.setState({ alert_message: [...this.state.alert_message, "Invalid phone!"] })
    }

    let devices = await callApi('devices', { hotel_id: this.context.hotel_id[0] })
    for (var i = 0; i < devices.data.length; i++) {
      if (this.state.device.imei == devices.data[i].imei) {
        this.setState({ alert_message: [...this.state.alert_message, "Imei deja existe!"] })
      }
    }

    if (this.state.alert_message.length == 0)
      var x = await callApi('device', this.state.device, 'POST')

    if (x == undefined) {
      this.setState({ sucess_message: "echec" })
    } else {
      setTimeout(() => document.location.href = "/devices", 1000)
      this.setState({ sucess_message: "success" })
    }


  }

  async getAvailableRooms() {
    let availableRooms = await callApi('rooms/available/', {}, 'GET');
    return availableRooms;
  }

  async componentDidMount() {
    let test = await callApi('rooms/available', {}, 'GET');
  }

  render() {
    return <div>
      <div className="message-echec">
        {this.state.sucess_message == "echec" ? <p>reinsert information please !</p> : null}
      </div >
      <div className="message-succes">
        {this.state.sucess_message == "success" ? <p>Ajout avec succes !</p> : null}
      </div >
      <div className="message-erreur" >
        {this.state.alert_message.map(x => <p>{x}</p>)}
      </div>

      <FormNavigator device={this.state.device} send={this.send}  >

        <AddDeviceUn title='Add Device ' setData={this.setData} device={this.state.device} />
        <AddDeviceDeux title='Add Device ' setData={this.setData} device={this.state.device} rooms={this.getAvailableRooms} />
      </FormNavigator>
    </div>;
  }
}
AddDevice.contextType = UserContext

export default AddDevice;
