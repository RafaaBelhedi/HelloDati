import React, { Component } from 'react';
import FormNavigator from './FormNavigator'
import AddHotelUn from './AddHotelUn'
import AddHotelDeux from './AddHotelDeux'
import AddHotelThree from './AddHotelThree'
import { callApi } from '../../../Helpers';
import { UserContext } from '../../Context'
import { Redirect } from 'react-router-dom';
import Modal from 'react-awesome-modal';
import './AddHotelForm.scss'
class AddHotel extends Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			hotel: {

			},
			alert_message: [],
			visible: ''
		}
		this.setData = this.setData.bind(this)
		this.send = this.send.bind(this)
	}

	setData(hotel) {
		this.setState({ hotel: { ...this.state.hotel, ...hotel } })
	}

	closeModal() {
		this.setState({
			visible: false
		});
	}

	async send() {
		await this.setState({ alert_message: [] })

		if (!/[a-z]{1,10}/.test(this.state.hotel.hotel_name)) {

			this.setState({ alert_message: [...this.state.alert_message, "Invalid hotel name!"] })
		}
		if (!/[a-z]{1,10}/.test(this.state.hotel.city)) {

			this.setState({ alert_message: [...this.state.alert_message, "Invalid city!"] })
		}
		if (!/[a-z]{1,10}/.test(this.state.hotel.country)) {

			this.setState({ alert_message: [...this.state.alert_message, "Invalid country!"] })
		}
		if (!/[a-z]{1,10}/.test(this.state.hotel.region)) {

			this.setState({ alert_message: [...this.state.alert_message, "Invalidregion!"] })
		}
		if (!/[a-z]{1,10}/.test(this.state.hotel.continent)) {

			this.setState({ alert_message: [...this.state.alert_message, "Invalid continent!"] })
		}
		if (!/[a-z]{1,10}/.test(this.state.hotel.chain)) {

			this.setState({ alert_message: [...this.state.alert_message, "Invalid chain!"] })
		}

		if (!/^[0-9]*$/.test(this.state.hotel.stars)) {

			this.setState({ alert_message: [...this.state.alert_message, "Invalid stars Number!"] })
		}
		if (!/[a-z]{1,10}/.test(this.state.hotel.address)) {

			this.setState({ alert_message: [...this.state.alert_message, "Invalid address!"] })
		}
		if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(this.state.hotel.email)) {

			this.setState({ alert_message: [...this.state.alert_message, "Invalid email !"] })
		}
		if (!/[a-z]{1,10}/.test(this.state.hotel.facebook)) {

			this.setState({ alert_message: [...this.state.alert_message, "Invalid facebook!"] })
		}
		if (!/[a-z]{1,10}/.test(this.state.hotel.twitter)) {

			this.setState({ alert_message: [...this.state.alert_message, "Invalid twitter!"] })
		}
		if (!/[a-z]{1,10}/.test(this.state.hotel.youtube)) {

			this.setState({ alert_message: [...this.state.alert_message, "Invalid youtube!"] })
		}
		if (!/[a-z]{1,10}/.test(this.state.hotel.trip_advisor_url)) {

			this.setState({ alert_message: [...this.state.alert_message, "Invalid trip_advisor_url!"] })
		}

		if (this.state.alert_message.length == 0)
			var x = await callApi('hotel', this.state.hotel, 'POST')
		console.log(x, 'hey')
		if (x == undefined) {
			this.setState({ visible: "echec" })
		} else {
			this.setState({ visible: "success" })
		}

		document.location.href = "/hotels"

	}

	render() {
		// if(this.state.sucess_message == "success" )
		// return <Redirect to={'/hotels'} delay={2000}></Redirect>
		return <div>
			{/* <div className="message-echec">
				{this.state.sucess_message == "echec" ? <p>reinsert information please !</p>  : null}
			</div >
			<div className="message-succes">
				{this.state.sucess_message == "success" ? <p>Ajout avec succes !</p>  : null}
			</div > */}
			<div className="message-erreur" >
				{this.state.alert_message.map(x => <p>{x}</p>)}
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
						<button onClick={() => this.closeModal()} >X</button>
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
			<FormNavigator hotel={this.state.hotel} send={this.send}>
				<AddHotelUn title='Add Hotel ' setData={this.setData} hotel={this.state.hotel} />
				<AddHotelDeux title='Add Hotel ' setData={this.setData} hotel={this.state.hotel} />
				<AddHotelThree title='Add Hotel ' setData={this.setData} hotel={this.state.hotel} />
			</FormNavigator>
		</div>;
	}
}
AddHotel.contextType = UserContext

export default AddHotel;
