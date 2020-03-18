import React, { Component } from 'react';
import './AddDeviceForm.scss'
import { callApi } from '../../../Helpers';
import { UserContext } from '../../Context'
import Modal from 'react-awesome-modal';
class AddDeviceForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      device: {},
      alert_message: [],
      visible: '',
      hotels: []
    }
    this.setData = this.setData.bind(this)
    this.send = this.send.bind(this)
  }
  setData(device) {
    this.setState({ device: { ...this.state.device, ...device } })
  }

  async componentDidMount() {
    let hotels = await callApi("hotels")
    this.setState({ hotels: hotels.data })
  }

  async send() {
    await this.setState({ alert_message: [] })

    if (!/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]{15}$/.test(this.state.device.imei)) {

      this.setState({ alert_message: [...this.state.alert_message, "Invalid IMEI: it should have 15 number!"] })
    }
    if (!/^[0-9]*$/.test(this.state.device.call_time)) {

      this.setState({ alert_message: [...this.state.alert_message, "Invalid call_time !"] })
    }
    if (!/^[0-9]*$/.test(this.state.device.call_limit)) {

      this.setState({ alert_message: [...this.state.alert_message, "Invalid call_limit !"] })
    }
    if (!/^[0-9]*$/.test(this.state.device.number)) {

      this.setState({ alert_message: [...this.state.alert_message, "Invalid phone number!"] })
    }
    if (this.state.device.phone != null) {
      if (!/^[0-9a-zA-Z]+$/.test(this.state.device.phone)) {

        this.setState({ alert_message: [...this.state.alert_message, "Invalid phone mark !"] })
      }
    }
    else
      this.setState({ alert_message: [...this.state.alert_message, "Phone mark column shouldn't be empty !"] });
    if (this.state.device.hotel_id == null) {
      this.setState({ alert_message: [...this.state.alert_message, "Hotel column shouldn't be empty !"] });
    }


   await callApi('devices', { hotel_id: this.context.hotel_id[0] }).then(res=>{
    res.data.map(device => {
      return this.state.device.imei == device.imei && this.setState({ alert_message: [...this.state.alert_message, "IMEI already exist !"] })
    })
    res.data.map(device => {
      return this.state.device.number == device.number && this.setState({ alert_message: [...this.state.alert_message, "Phone number already exist !"] })
    })
   })

    if (this.state.alert_message.length == 0) {
      await callApi('device', this.state.device, 'POST')
        .then(res => {
          this.setState({ visible: "success" });
          // setTimeout(() => document.location.href = "/devices", 1000);
        }).catch(err=>{ this.setState({ visible: "echec" });})
    }
    else this.setState({ visible: "echec" });

  }

  closeModal() {
    this.setState({
      visible: false
    });
  }

  render() {

    return <div className='device-form-adds'>
      <div className="device-header">
        <div className="title-device">
          <div><img src="/img/ui/ajouter_client.png" alt="phone_photo" /></div>
          Add Device
        </div>
      </div>

      <div className="message-erreur" >
        {this.state.alert_message.map(errorMessage => <p>{errorMessage}</p>)}
      </div>
      {this.state.visible == "success" ?
        <Modal
          className="my-modal"
          visible={this.state.visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div className="valide-modal">
            <img src="/img/ui/succes.png" style={{ width: "32", height: "32" }} />
            <div>Successfully added !</div>

          </div>
        </Modal>
        : null}
      {this.state.visible == "echec" ?
        <Modal
          className="my-modal"
          visible={this.state.visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div className="echec-modal">
            <img src="/img/ui/echec.png" style={{ width: "32", height: "32" }} />
            <div>Reinsert information please !</div>
            {/* <button onClick={() => this.closeModal()} >X</button> */}
          </div>
        </Modal>
        : null}
      <div className="device-inputs">
        <input value={this.state.imei} type="number" required placeholder="IMEI" onChange={(e) => { this.setData({ imei: e.target.value.substr(0, 15) }); this.setState({ imei: e.target.value.substr(0, 15) }) }} />
        <input type="number" required placeholder="Call Time in minutes" onChange={(e) => this.setData({ call_time: (e.target.value*60) })} />
        <input type="number" required placeholder="Call Limit in minutes" onChange={(e) => this.setData({ call_limit: (e.target.value*60) })} />
        <input type="number" required placeholder="Phone Number" onChange={(e) => this.setData({ number: e.target.value })} />
        <input type="text" required placeholder="Phone Mark" onChange={(e) => this.setData({ phone: e.target.value })} />
        <select name="hotel_id" onChange={(e) => { this.setData({ hotel_id: e.target.value }); console.log('hotel value', e.target.value) }}>
          <option selected disabled hidden>Hotel Name</option>
          {this.state.hotels.map(x => <option value={x.id}>{x.hotel_name}</option>)}
        </select>
        <select onChange={(e) => this.setData({ intra_flotte: e.target.value })}>
          <option selected disabled hidden>Intra Flotte?</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
        <button onClick={this.send}>
          <img src="/img/ui/valid.png" />
          Confirm
      </button>
      </div>

    </div >;
  }
}

AddDeviceForm.contextType = UserContext

export default AddDeviceForm;