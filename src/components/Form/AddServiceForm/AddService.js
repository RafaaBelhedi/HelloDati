import React, { Component } from 'react';
import { callApi,callApiWithBody } from '../../../Helpers';
import { UserContext } from '../../Context'
import FormNavigator from './FormNavigator';
import AddServiceOne from './AddServiceOne';
import AddServiceTow from './AddServiceTow';
import Modal from 'react-awesome-modal';
import ImageUploader from 'react-images-upload';
import InputColor from 'react-input-color';

class AddService extends Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			services: {
				hotel_id: this.context.hotel_id[0],
				parent_id: this.props.match.params.id,
				content_manager:0,
				type:0,
				categories:"NaNCategories",
				col_span:4,
				state:1,
				title_color:"#5e72e4"
			},
			disabled : false,
		}
		this.setData = this.setData.bind(this)
		this.send = this.send.bind(this)
		this.upload = this.upload.bind(this)
	
	}

	setData(services) {
		console.log(services,"services")
		this.setState({ services: { ...this.state.services, ...services } })
	}



	async upload(e) {
		let post = new FormData()
		post.append('image', document.getElementsByName('image')[0].files[0])
		let image = await callApiWithBody('upload', post, 'POST')
		this.setData({ image: image.image })
		document.querySelector('.fileContainer').style.backgroundImage = `url(${image.image})`
	
	  }
	async send(e) {
		e.preventDefault()
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
			
<div className='room-form-add'>
			
			<div className="room-header">
				<div>Add Service</div>
			</div>
			{/* <div className="message-erreur" >
			{this.state.alert_message.map(alert => <p>{alert}</p>)}
		</div> */}
			<div className='room-form-add'>
				<div className="room-inputs">
		
<div className="section-one-service">
				    <input type="text" placeholder="Title" name ="title" onChange={(e) => this.setData({ title: e.target.value })} required />
					<select name="prefix" onChange={(e) => this.setData({ layout_xml_template: e.target.value })}>
							<option selected disabled hidden> Services  </option>
							<option value="1">Restaurant</option>
							<option value="2">Boisson</option>
							<option value="3">Leisure</option>
							<option value="4">Gallerie</option>
							<option value="5">Meeting</option>
							<option value="6">Contact</option>
							<option value="7">Event</option>
							<option value="8">Well-being</option>
							<option value="9">weather</option>
							<option value="10">prayer</option>
							<option value="11">concierge</option>
						</select>
						</div>
						<div className="section-two-service">
						<ImageUploader 
						fileContainerStyle={{ height: '152px', width: "100%", backgroundColor: " #d2d2d2" }}
              onChange={this.upload}
              label={'Max file size: 2MB | Allowed formats: jpg, png'}
              maxFileSize="2097152"
              name="image"
            />
						</div>
							
			
					{this.state.disabled == false ? <button onClick={this.send} ><img src="/img/ui/valid.png" />Add</button> : <button className="sendingData"> Sending...</button>}
					
				</div>
			</div>
		</div>
		</div>;
	}
}
AddService.contextType = UserContext

export default AddService;
