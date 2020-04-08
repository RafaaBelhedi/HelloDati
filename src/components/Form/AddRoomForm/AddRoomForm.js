import React, { Component } from 'react';
import './AddRoomForm.scss'
import { callApi } from '../../../Helpers';
import { UserContext } from '../../Context'
import Modal from 'react-awesome-modal';
class AddRoomForm extends Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			room: {
				room_number: '',
				section: '',
				floor: '',
				capacity: '',
				hotel_id: this.context.hotel_id[0],
				status: '1',

			},
			alert_message: [],
			sucess_message: '',
			visible: '',
			availableDevices: [],
			unAvailableDevices: [],
			availableDisplay: 'none',
			unAvailableDisplay: 'none',
			disabled : false,
		}
		this.setData = this.setData.bind(this);
		this.submit = this.submit.bind(this);
	}
	async componentDidMount() {
		let availableDevices = await callApi('devices/available', { hotel_id: this.context.hotel_id });
		this.setState({ availableDevices: availableDevices.data });
		let unAvailableDevices = await callApi('devices/unavailable', { hotel_id: this.context.hotel_id });
		this.setState({ unAvailableDevices: unAvailableDevices.data });
		await callApi('rooms', { hotel_id: this.context.hotel_id[0] }).then(res=>{
			this.setState({ rooms: res.data});
		})
	}
	closeModal() {
		this.setState({
			visible: false
		});
	}

	async submit() {

		await this.setState({ alert_message: [] })
		this.setState({disabled: true});
	
	
		if (document.forms["formAddRoom"]["room_number"].value) {
			if (! /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g.test(this.state.room.room_number)) {

				this.setState({ alert_message: [...this.state.alert_message, "Invalid Room Number!"] })
			}
		} else if (document.forms["formAddRoom"]["room_number"].value == "") {
			await this.setState({ alert_message: [...this.state.alert_message, "Missing Room Number!"] })
		}


		
		if (document.forms["formAddRoom"]["section"].value) {
			if (!/[A-Za-z]{1,100}/.test(this.state.room.section)) {

				this.setState({ alert_message: [...this.state.alert_message, "Invalid Section!"] })
			}
		} else if (document.forms["formAddRoom"]["section"].value == "") {
			await this.setState({ alert_message: [...this.state.alert_message, "Missing Section!"] })
		}

			
		if (document.forms["formAddRoom"]["floor"].value) {
			if (!/^[0-9]*$/.test(this.state.room.floor)) {

				this.setState({ alert_message: [...this.state.alert_message, "Invalid Floor Input!"] })
			}
		} else if (document.forms["formAddRoom"]["floor"].value == "") {
			await this.setState({ alert_message: [...this.state.alert_message, "Missing Floor Number!"] })
		}


		if (document.forms["formAddRoom"]["capacity"].value) {
			if (!/^[0-9]*$/.test(this.state.room.capacity)) {

				this.setState({ alert_message: [...this.state.alert_message, "Invalid Capacity Input!"] })
			}
		} else if (document.forms["formAddRoom"]["capacity"].value == "") {
			await this.setState({ alert_message: [...this.state.alert_message, "Missing Room capacity!"] })
		}
		
		if (this.state.deviceId == undefined){
			await this.setState({ alert_message: [...this.state.alert_message, "Linked room to device please !"] })
		}

		this.state.rooms.map(rooms => {
			
			return this.state.room.room_number  == rooms.room_number && this.setState({ alert_message: [...this.state.alert_message, "Room already exist!"] })
		})
		if (this.state.alert_message.length == 0) {

			await callApi('room', this.state.room, 'POST').then(res => {
				this.setState({ visible: "success" });
				this.setState({ disabled: true});
				if (this.state.room.room_number) {

					this.setState({ room_id: res.data[0].id, hotel_id: res.data[0].hotel_id });

					let request = {
						room_id: this.state.room_id,
						hotel_id: this.state.hotel_id,
						device_id: this.state.deviceId,
						list_type: this.state.listType
					};

					if (this.state.deviceId !== undefined)
						callApi('/device_room/attach', request, 'POST');
				}
				

			}).catch(error => { this.setState({ visible: "echec" }) });
		}
		if (this.state.alert_message.length == 0) {
			this.setState({ visible: "success" });
			this.setState({ disabled: true});
			setTimeout(() => document.location.href = "/rooms", 1000);
		} else {
			this.setState({ visible: "echec" })
			this.setState({ disabled: false})
		}
	}
	setData(room) {
		this.setState({ room: { ...this.state.room, ...room } });
	}

	render() {
		console.log(this.state.disabled,"rrrrrrrtyyy")
		return <div>
			
			<div className='room-form-add'>
			
				<div className="room-header">
					<div><img src="/img/ui/add_room.png" /></div>
					<div>Add Room</div>
				</div>
				<div className="message-erreur" >
				{this.state.alert_message.map(alert => <p>{alert}</p>)}
			</div>
				<div className='room-form-add'>
					<div className="room-inputs">
				<form name="formAddRoom"  >

						<div style={{ width: " 50%" }}><input type="text" placeholder="Room Number" name ="room_number" onChange={(e) => this.setData({ room_number: e.target.value })} required /></div>
						<div style={{ width: " 50%" }}><input type="text" placeholder="Section" name ="section" onChange={(e) => this.setData({ section: e.target.value })} pattern="[A-Za-z]{1,100}" required /></div>
						<div style={{ width: " 50%" }}><input type="number" placeholder="Floor" name ="floor" onChange={(e) => this.setData({ floor: e.target.value })} required /></div>
						<div style={{ width: " 50%" }}><input type="number" placeholder="Capacity" name ="capacity"  onChange={(e) => this.setData({ capacity: e.target.value })} required /></div>
						</form>
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
										<option value={device.id}>
											Imei: {device.imei} | Phone: {device.phone} | Status: {device.status === 1 ? 'Active' : 'Inactive'}
										</option>)}
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
										<option value={device.id}>
											Imei: {device.imei} | Phone: {device.phone} | Status: {device.status === 1 ? 'Active' : 'Inactive'}
										</option>)}

								</select>
							</div>
						</div>
						</div>
						{this.state.disabled == false ? <button onClick={this.submit} ><img src="/img/ui/valid.png" />Add</button> : <button className="sendingData"> Sending...</button>}
						{this.state.visible == "success" ?
							<Modal
								className="my-modal"
								visible={this.state.visible}
								width="400"
								height="300"
								effect="fadeInUp"
								onClickAway={() => {this.closeModal();this.setState({ disabled: false})}}
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
					</div>
				</div>
			</div>
		</div>
	}
}

AddRoomForm.contextType = UserContext

export default AddRoomForm;