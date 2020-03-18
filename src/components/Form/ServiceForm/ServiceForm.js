import React, { Component } from 'react';
import './ServiceForm.scss'
import { callApi } from '../../../Helpers';
import {UserContext} from '../../Context'
import FormNavigator from './FormNavigator'
import ServiceFormOne from './ServiceFormOne'
import ServiceFormTow from './ServiceFormTow'
import Modal from 'react-awesome-modal';



class ServiceForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      service: {},
    //   sucess_message:'',
    //   alert_message:[],
    visible:"",
      
    }
    this.send = this.send.bind(this)
    this.setData=this.setData.bind(this)
  }
  async componentDidMount() {
    let service = await callApi('post/' + this.props.match.params.id)
    this.setState({ service: service.data[0] })
    console.log(this.state,"my state is here ")
   
  }

  setData(service) {
    this.setState({ service: { ...this.state.service ,...service } })
  }
  async send() {

    if (this.state.service.title)
    await callApi('post/' +this.state.service.id, {title:this.state.service.title},'PUT').then(res=>{this.setState({visible:"success"})})

    console.log(this.state,"rani nekhdem") 
    console.log() 
  }
  
  closeModal=()=> {
		this.setState({
			visible: false
		});
	}

  render() {
   
console.log(this.props,"tyuiooiuir")
    return <div className='tourist-form'>
      <div className="edit-just-title">
<label>Title</label>
<input
          type="text"
          placeholder="Title"
          value={this.state.service.title || ''}
          onChange={(e) => this.setData({ title: e.target.value })}
          className="input-service-edit-title-anly" />
          </div>
      <div> <button className="bt-service-edit-title-anly" onClick={this.send}>Confirm</button></div>   
          
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
									<div>your title has been changed !</div>
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
  </div>;
  }
  
}

ServiceForm.contextType = UserContext

export default ServiceForm;
