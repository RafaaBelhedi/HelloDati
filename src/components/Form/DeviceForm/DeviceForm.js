import React, { Component } from 'react';
import './DeviceForm.scss'
import { callApi } from '../../../Helpers';
import { UserContext } from '../../Context';
import Modal from 'react-awesome-modal';

class DeviceForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      device: {
        id:'',
        call_limit:'',
        call_time:'',
         device_room: { room: {}, stay: { tourist: {} } },hotel:{} },
      rooms: [],
      tourists: [],
      alert_message: [],
      visible: false,
      shown:"",
      hotels:[],
      imeiFix:"",
   
    }
    this.edit = this.edit.bind(this)
    this.setData = this.setData.bind(this)

  }
  async componentDidMount() {
    let device = await callApi('device/' + this.props.match.params.id);
    this.setState({ device: device.data[0] });
    this.setState({ imeiFix: device.data[0].imei });
    this.setState({ room_id: device.data[0].device_room.room.room_id });
    this.setState({ tourist_id: device.data[0].device_room.stay.tourist.tourist_id })
    let rooms = await callApi('rooms', { hotel_id: this.state.device.hotel_id })
    this.setState({ rooms: rooms.data });
    let tourists = await callApi('tourists', { hotel_id: this.state.device.hotel_id })
    this.setState({ tourists: tourists.data });
    let hotels = await callApi("hotels")
    this.setState({ hotels: hotels.data })
  }
  closeModal() {
    this.setState({
      visible: false
    });
  }

  async edit() {
    await this.setState({ alert_message: [] })

   if( document.forms["formEditDevice"]["imei"].value ){
    if (!/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]{15}$/.test(this.state.device.imei)) {
      this.setState({ alert_message: [...this.state.alert_message, "Invalid IMEI: it should have 15 number!"] })
    }}else if (document.forms["formEditDevice"]["imei"].value == ""){
      await this.setState({ alert_message: [...this.state.alert_message, "messing imei!"] })
    }

    if( document.forms["formEditDevice"]["call_time"].value ){
    if (!/^[0-9]*$/.test(this.state.device.call_time)) {
      this.setState({ alert_message: [...this.state.alert_message, "Invalid call_time!"] })
    }}else if (document.forms["formEditDevice"]["call_time"].value == ""){
      await this.setState({ alert_message: [...this.state.alert_message, "messing call time!"] })
    }

    if( document.forms["formEditDevice"]["call_limit"].value ){
      if (!/^[0-9]*$/.test(this.state.device.call_limit)) {
        this.setState({ alert_message: [...this.state.alert_message, "Invalid call limit!"] })
      }}else if (document.forms["formEditDevice"]["call_limit"].value == ""){
        await this.setState({ alert_message: [...this.state.alert_message, "messing call limit !"] })
      }


      if( document.forms["formEditDevice"]["number"].value ){
        if (!/^[0-9]*$/.test(this.state.device.number)) {
          this.setState({ alert_message: [...this.state.alert_message, "Invalid number!"] })
        }}else if (document.forms["formEditDevice"]["number"].value == ""){
          await this.setState({ alert_message: [...this.state.alert_message, "messing number !"] })
        }
        
      if (document.forms["formEditDevice"]["hotel_id"].value === ""){
            await this.setState({ alert_message: [...this.state.alert_message, "messing Hotel !"] })
          }

        await callApi('devices', { hotel_id: this.context.hotel_id[0] }).then(res=>{
      let otherDevices = res.data.reduce((otherDevices, item) => {
       if (item.id !== this.state.device.id) {
        otherDevices.push(item);
       }
       return otherDevices;

     }, []);
          otherDevices.map(device=>{
         return  this.state.device.number == device.number &&  this.setState({ alert_message: [...this.state.alert_message, "Sim number already registered !"] })
          })
          otherDevices.map(device=>{
            return  this.state.device.imei == device.imei &&  this.setState({ alert_message: [...this.state.alert_message, "imei already registered !"] })
             })
         })

        if (this.state.alert_message.length == 0){
        await callApi('device/' + this.state.device.id, {imei: this.state.device.imei ,  call_time: this.state.device.call_time , call_limit: this.state.device.call_limit,intra_flotte: this.state.device.intra_flotte, hotel_id: this.state.device.hotel_id,number: this.state.device.number }, 'PUT')
        .then(res=>{
          console.log(res,"lalalal device")
            this.setState({visible: "succes"})
			// setTimeout(() => document.location.href = "/devices", 1000);
        }).catch(error=>{
          this.setState({visible: "echec"})
        })
        } else if (this.state.alert_message.length !== 0) {
          await  this.setState({visible: "echec"});
        }

        console.log(this.state.device.hotel_id,"hoteeeeelid")
      }


  setData(device) {
    this.setState({ device: { ...this.state.device, ...device } })
console.log(device,"device")
  }

  render() {
let call_time_minute
if(this.state.device.call_time !== undefined && this.state.device.call_time/60 !==0 ){
 call_time_minute = this.state.device.call_time/60 
}   

let call_limit_minute
if(this.state.device.call_limit !== undefined && this.state.device.call_limit/60 !==0 ){
 call_limit_minute = this.state.device.call_limit/60 
}  
console.log(call_limit_minute ,"this.state.device.call_time")


    return <div className='device-form-edit'>
      <div className="device-header">
        <div className="title-device-edit">
          <img src="/img/ui/ajouter_client.png" alt="image" />
          <span>Device IMEI: {this.state.imeiFix}</span>
        </div>
        </div>
        <div className="message-erreur" >
          {this.state.alert_message.map(x => <p>{x}</p>)}
        </div>
        {this.state.visible === "succes" &&
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
              <div>Successfully updated!</div>
              <button onClick={() => { this.closeModal() }} >X</button>
            </div>
          </Modal>
         }
        {this.state.visible === "echec" &&
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
              <button onClick={() => this.closeModal()} >X</button>
            </div>
          </Modal>
          }
      
      <div className="device-input">

        {/* <div>
          <label>Free Room:</label>
          <select onChange={e => this.setState({ room_id: e.target.value })}>
            <option selected disabled hidden>{this.state.device.device_room.room.room_number}</option>
            {RoomDispo.map(x => <option value={x.id}>
              {'Room ' + x.room_number + ' Section: ' + x.section + ' / Floor: ' + x.floor}
            </option>)}
          </select>
        </div> */}
        {/* <div>
          <label> Guest:</label>
          <select onChange={e => this.setState({ tourist_id: e.target.value })}>
            <option selected disabled hidden>{this.state.device.device_room.stay.tourist.name || "Device Not Affected To A Guest"}</option>
            {this.state.tourists.map(x => <option value={x.id}>
              {x.first_name + ' ' + x.last_name}
            </option>)}
          </select>
        </div> */}

        {(this.context.role == 3) ? <>
          <form  name="formEditDevice" onsubmit={this.edit}>
          <div>
            <label htmlFor="imei">IMEI:</label>
            <input defaultValue={this.state.device.imei} name="imei" maxlength="15" onChange={(e) => this.setData({ imei:e.target.value})}  />
          </div>
          <div>
            <label htmlFor="call_time">Call Time in minutes:</label>
            <input defaultValue={call_time_minute} name="call_time" onChange={(e) => this.setData({ call_time: (e.target.value*60) })}   />
          </div>
          <div>
            <label htmlFor="call_limit">Call Limit in minutes:</label>
            <input defaultValue={call_limit_minute} name="call_limit" onChange={(e) => this.setData({ call_limit: (e.target.value*60) })} />
          </div>
          <div>
            <label htmlFor="intra_flotte">Intra Flotte:</label>
            <select name="intra_flotte"  name="intra_flotte" onChange={(e) => this.setData({ intra_flotte: e.target.value })}>
              <option selected disabled hidden>{this.state.device.intra_flotte == 0 && "No"||this.state.device.intra_flotte == 1 && "Yes"}</option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
          {/* <div>
            <label htmlFor="status">Status:</label>
            <select name="status" onChange={(e) => this.setData({ status: e.target.value })}>
              <option selected hidden>{this.state.device.status === 1 ? 'Active' : 'Inactive'}</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div> */}
          <div>
          <label htmlFor="hotel">Hotels:</label>
          <select name="hotel_id" onChange={(e) => { this.setData({ hotel_id: e.target.value }); console.log('hotel value', e.target.value) }}>
          <option selected disabled hidden>{this.state.device.hotel.hotel_name}</option>
          {this.state.hotels.map(x => <option value={x.id}>{x.hotel_name}</option>)}
        </select>
          </div>
          <div>
            <label htmlFor="number">Sim Number:</label>
            <input defaultValue={this.state.device.number} name="number"  maxlength="8" onChange={(e) => this.setData({ number: e.target.value })} />
          </div>
          </form>
        </> : null}
        </div>

        <button onClick={this.edit}>
          <img src="/img/ui/valid.png" />
          Confirm
      </button>
    </div>;
  }
}

DeviceForm.contextType = UserContext

export default DeviceForm;
