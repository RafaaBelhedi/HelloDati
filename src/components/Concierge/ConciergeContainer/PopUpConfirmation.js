import React, { Component } from 'react';
import "./ConciergeContainer.scss";
import Modal from 'react-awesome-modal';
import TimeField from 'react-simple-timefield';
import { callApi } from '../../../Helpers';
import { UserContext } from '../../Context';

class PopUpConfirmation extends Component {
  constructor(props) {
    super(props)
    this.state = {
     send:false,
     demandeUpdating:{},
    }
    this.update=this.update.bind(this)
  }


  async update() {
      this.setState({send:true});
    await callApi('demands/'+this.props.confirmation.id,{status:1},'PUT').then(res=>{
       this.setState({demandeUpdating:res.data[0]});
     console.log(res.data[0],"Demandes")
      callApi('demands', { hotel_id: this.context.hotel_id[0] }).then(res=>{
      this.props.setData({res});
      console.log( res," res.data")
  
    })
      this.props.closeModal();
    }).catch(err=>{this.setState({send:false})})
  }


  // async componentDidUpdate(prevState) {
  //   if (this.state.demandeUpdating.status !== this.props.confirmation.status) {
  //     await callApi('demands', { hotel_id: this.context.hotel_id[0] }).then(res=>{
  //       // this.props.setData({ Demandes: res.data});
  //       console.log( res.data," res.data")
    
  //     })
  //   }
  // }
  
  render() {
      console.log(this.props.confirmation,"CurrentDemande")
    return <div className="PopUpConfirmation">
			<Modal
					className="my-modal-demande"
					visible={this.props.Accept}
					width="250"
					height="150"
					effect="fadeInUp"
					onClickAway={() => this.props.closeModal() }
				>
					<div className="valide-modal-demande">
				  
                     <p>Delay In minutes</p>
                     <TimeField name= "input_time" onChange={this.props.handleChange}  className="input_delay"/>  
                    {this.state.send==false?<div onClick={this.update}>confirmation </div>: <div> Accepting... </div>}
                    </div> 
				</Modal>
   
     
    </div>;
  }
}

PopUpConfirmation.contextType = UserContext
export default PopUpConfirmation;
