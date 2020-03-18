import React, { Component } from 'react';
import { callApi } from '../../../Helpers';
import { UserContext } from '../../Context'
import FormNavigator from './FormNavigator';
import AddServiceOne from './AddServiceOne';
import AddServiceTow from './AddServiceTow';
import Modal from 'react-awesome-modal';


class AddService extends Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			services: {
				hotel_id: this.context.hotel_id[0],
				parent_id: this.props.match.params.id,
			},
		}
		this.setData = this.setData.bind(this)
		this.send = this.send.bind(this)
	}

	setData(services) {
		this.setState({ services: { ...this.state.services, ...services } })
	}
	async send() {
		await callApi('post', this.state.services, 'POST').then(res => {
			this.setState({ visible: "success" })
			window.location.href = new URLSearchParams(window.location.search).get('return')
		}).catch(error => { this.setState({ visible: "echec" }) })
	}
	render() {

		return <div>
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
						<button onClick={() => this.closeModal()}>X</button>
					</div>
				</Modal>
				: null}
			<FormNavigator services={this.state.services} send={this.send} >
				<AddServiceOne title='Add Service ' services={this.state.services} setData={this.setData} />
				<AddServiceTow title='Add Service ' services={this.state.services} setData={this.setData} />
			</FormNavigator>

		</div>;
	}
}
AddService.contextType = UserContext

export default AddService;
