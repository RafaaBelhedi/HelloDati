import React, { Component } from 'react';
import './RoomForm.scss'
import { callApi } from '../../../Helpers';
import { UserContext } from '../../Context';
import { Redirect } from 'react-router-dom';
import Modal from 'react-awesome-modal';

class RoomForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      room: {device_rooms:{device:{imei:""}}},
      deviceRoom: {},
      alert_message: [],
      sucess_message: '',
      availableDevices: [],
      unAvailableDevices: [],
      availableDisplay: 'none',
      unAvailableDisplay: 'none',
      disabled : false,
    }
    this.edit = this.edit.bind(this)
    this.setData = this.setData.bind(this)
  }
  setData(room) {
    this.setState({ room: { ...this.state.room, ...room } })
  }
  async componentDidMount() {
    let room = await callApi('room/' + this.props.match.params.id);
    this.setState({ room: room.data[0] });
    let availableDevices = await callApi('devices/available', { hotel_id: this.context.hotel_id });
    this.setState({ availableDevices: availableDevices.data });
    let unAvailableDevices = await callApi('devices/unavailable', { hotel_id: this.context.hotel_id });
    this.setState({ unAvailableDevices: unAvailableDevices.data });
    // console.log(room,"roomroomroom")
    // console.log(room.data[0].device_rooms.length,"roomroomroom")

  }
  async edit(e) {
    e.preventDefault()
   await this.setState({ alert_message: [] })

    if (document.forms["formEditRoom"]["room_number"].value) {
			if (! /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g.test(this.state.room.room_number)) {
				this.setState({ alert_message: [...this.state.alert_message, "Invalid Room Number!"] })
			}} else if (document.forms["formEditRoom"]["room_number"].value == "") {
			await this.setState({ alert_message: [...this.state.alert_message, "Missing Room Number!"] })
		}


		
		if (document.forms["formEditRoom"]["section"].value) {
			if (!/[A-Za-z]{1,100}/.test(this.state.room.section)) {
				this.setState({ alert_message: [...this.state.alert_message, "Invalid Section!"] })
			}	} else if (document.forms["formEditRoom"]["section"].value == "") {
			await this.setState({ alert_message: [...this.state.alert_message, "Missing Section!"] })
		}

			
		if (document.forms["formEditRoom"]["floor"].value) {
			if (!/^[0-9]*$/.test(this.state.room.floor)) {
			this.setState({ alert_message: [...this.state.alert_message, "Invalid Floor Input!"] })
			}	} else if (document.forms["formEditRoom"]["floor"].value == "") {
			await this.setState({ alert_message: [...this.state.alert_message, "Missing Floor Number!"] })
		}


		if (document.forms["formEditRoom"]["capacity"].value) {
			if (!/^[0-9]*$/.test(this.state.room.capacity)) {
				this.setState({ alert_message: [...this.state.alert_message, "Invalid Capacity Input!"] })
			}} else if (document.forms["formEditRoom"]["capacity"].value == "") {
			await this.setState({ alert_message: [...this.state.alert_message, "Missing Room capacity!"] })}
    
      
		if ((this.state.deviceId == undefined)&&(this.state.room.device_rooms[0] == undefined )){
			await this.setState({ alert_message: [...this.state.alert_message, "Linked room to device please !"] })
    }

    
   await callApi('rooms', { hotel_id: this.context.hotel_id[0] }).then(res => {
			let otherRooms = res.data.reduce((otherRooms, item) => {
				if (item.id !== this.state.room.id) {
					otherRooms.push(item);
				}
				return otherRooms;

      }, []);
   
      this.setState({disabled: true});
			otherRooms.map(room => {
				return this.state.room.room_number == room.room_number && this.setState({ alert_message: [...this.state.alert_message, "Room already registered !"] })
      })})
      
    if (this.state.alert_message.length == 0)
       await callApi('room/' + this.state.room.id, {room_number: this.state.room.room_number ,  section: this.state.room.section,floor: this.state.room.floor  ,capacity: this.state.room.capacity }, 'PUT')
       
        if (this.state.alert_message.length == 0) {
          this.setState({ visible: "success" })
        //  setTimeout(() => document.location.href = "/rooms", 1000);
        } else {
          this.setState({ visible: "echec" })
        }

    if (this.state.room.room_number) {
      this.setState({ room_id: this.state.room.id, hotel_id: this.state.room.hotel_id });
      let request = {
        room_id: this.state.room.id,
        hotel_id: this.state.room.hotel_id,
        device_id: this.state.deviceId,
        list_type: this.state.listType,
        linked_to_device: this.state.room.linked_to_device
      };
      if (this.state.deviceId !== undefined)
        callApi('/device_room/attach', request, 'POST');
    }



  }

  closeModal=()=> {
		this.setState({
			visible: false
		});
	}
  render() {
    // if (this.state.sucess_message == "success")
    //   return <Redirect to={"/rooms"}></Redirect>
    return <div>
   	
      <div className='room-form'>
        <div className="room-header">Edit Room</div>
        <div className="message-erreur" >
				{this.state.alert_message.map(alert => <p>{alert}</p>)}
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
          <div>successfully added !</div>
          {/* <button onClick={() => this.closeModal()} >X</button> */}
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
          <button onClick={() => this.closeModal()} >X</button>
        </div>
      </Modal>
      : null}
        <div className="room-edit-inputs">
        
          {(this.context.role == 3 || this.context.role == 2) ? <div className="room-inputs-deux">
          <form name="formEditRoom" className="form_Edit_Room">
            <div className="label_input">
              <div>
                <label htmlFor="first_name">Room Number:</label>
                <input placeholder="Room Number" name="room_number" defaultValue={this.state.room.room_number} id="room_number" onInput={e => this.setData({ room_number: e.target.value })} />
              </div>
              <div>
                <label htmlFor="call_time">Section:</label>
                <input placeholder="Section"  name="section"defaultValue={this.state.room.section} id="section" onInput={e => this.setData({ section: e.target.value })} />
              </div>
            </div>
            <div className="label_input">
              <div>
                <label htmlFor="floor">Floor :</label>
                <input placeholder="Floor" name="floor" defaultValue={this.state.room.floor} id="floor" onInput={e => this.setData({ floor: e.target.value })} />
              </div>
              <div>
                <label htmlFor="capacity">Capacity :</label>
                <input placeholder="capacity" name="capacity" defaultValue={this.state.room.capacity} id="capacity" onInput={e => this.setData({ capacity: e.target.value })} />
              </div>
            </div>
  <span>  <p>{this.state.room.device_rooms[0] !== undefined &&"Room linked to :" }{(this.state.room.device_rooms[0] == undefined )?"Room not attached to device":this.state.room.device_rooms[0].device.imei}</p> </span> 
  <div className="all">
            <div className="all1">  
              <div>
                <input style={{ width: "15px" }} type="radio" name="devices" id="available_devices" value="inline" onClick={(e) => this.setState({ unAvailableDisplay: 'none', availableDisplay: e.target.value })} />
                <label for="available_devices"> Attach to an available device</label>
              </div>
              <div>
                <select onChange={(e) => this.setState({ deviceId: e.target.value, listType: 'available' })} style={{ display: this.state.availableDisplay }}>
                  <option selected>Attach To an available Device</option>
                  {this.state.availableDevices.map(device =>
                    this.state.room.linked_to_device == 1 ? this.state.room.device_rooms[0].device_id != device.id &&
                      <option value={device.id}>
                        Phone Type: {device.phone} | Imei: {device.imei}
                      </option> : <option value={device.id}>
                        Phone Type: {device.phone} | Imei: {device.imei}
                      </option>

                  )}

                </select>
              </div>
            </div>
            <div className="all2">
              <div>
                <input style={{ width: "15px" }} type="radio" name="devices" id="unavailable_devices" value="inline" onClick={(e) => this.setState({ unAvailableDisplay: e.target.value, availableDisplay: 'none' })} />
                <label for="unavailable_devices"> Attach with linked device</label>
              </div>
              <div>
                <select onChange={(e) => this.setState({ deviceId: e.target.value, listType: 'unavailable' })} style={{ display: this.state.unAvailableDisplay }}>
                  <option selected>Attach with linked device </option>
                  {this.state.unAvailableDevices.map(device =>
                    this.state.room.linked_to_device == 1 ? this.state.room.device_rooms[0].device_id != device.id &&
                      <option value={device.id}>
                        Phone Type: {device.phone} | Imei: {device.imei}
                      </option> : <option value={device.id}>
                        Phone Type: {device.phone} | Imei: {device.imei}
                      </option>

                  )}

                </select>
              </div>
            </div>
            </div>

            <button onClick={this.edit} disabled={this.state.disabled}>
              <img src="/img/ui/valid.png" />
              Confirm
              </button>
      
              </form>
          </div> 
           : null}

        </div>

      </div>
    </div>;
  }
}

RoomForm.contextType = UserContext

export default RoomForm;
