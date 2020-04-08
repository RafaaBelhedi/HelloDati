import React, { Component } from 'react';
import { callApi } from '../../../Helpers';
import HistoryItem from '../../UI/HistoryItem'
import OrderPopover from "../../UI/OrderPopover"
import './ConciergeContainer.scss';
import { UserContext } from '../../Context';
import PopUpConfirmation from'./PopUpConfirmation'
class ConciergeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Demandes: [],
      Accept:false,
      Reject:false,
      CurrentDemande:[],
    }
    this.closeModal = this.closeModal.bind(this)
    this.filterDemandes = this.filterDemandes.bind(this)
    this.renderStatus = this.renderStatus.bind(this)
    this.formatDate = this.formatDate.bind(this)
    this.SetDemandes = this.SetDemandes.bind(this)
    this.setData = this.setData.bind(this)

 

    


  }

  async componentDidMount() {
  await callApi('demands', { hotel_id: this.context.hotel_id[0] }).then(res=>{
    this.setState({ Demandes: res.data});

  })
console.log(this.state.Demandes,"Demandes")
console.log(this.state.CurrentDemande,"CurrentDemande")

  }

  async  setData(Demandes) {
    console.log(...Demandes.res.data,"Demandeswsel")
  await this.setState({ Demandes: Demandes.res.data })
  }
  
  filterDemandes(Demandes) {
 
    let filteredDemandes = Demandes
      .filter(x => new RegExp(this.props.data.room_number, 'i').test(x.room_number))
      .filter(x => new RegExp(this.props.data.status, 'i').test(x.status))
      .filter(x => new RegExp(this.props.data.type, 'i').test(x.type))
    //  if (this.props.data.start_date)
    //    filteredDemandes = filteredDemandes.filter(x => { console.log(x.created_at); return x.created_at > this.props.data.start_date })
    // if (this.props.data.end_date)
    //    filteredDemandes = filteredDemandes.filter(x => x.created_at < this.props.data.end_date)
    return filteredDemandes;
  
  }


  renderStatus(status) {
    switch (status) {
      case 0:
        return <><span style={{ backgroundColor: "#F0B17A" }}></span><p>Waiting</p></>
      case 1:
        return <><span style={{ backgroundColor: "#879CBF" }}></span><p>Accepted</p></>
 
    }
  }


  formatDate(timestamp) {
    console.log(timestamp,"timestamp")
    let date = new Date(timestamp)

    return <p>{date.getHours() + ":" + date.getMinutes()}<br />{date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()}</p>
  }
	closeModal(){
		this.setState({
			Accept: false
		});
	}
 async SetDemandes(x){
await this.setState({CurrentDemande:x})
 }

  render() {

    return <div className="history-items">
 
 {this.state.Accept == true &&
	        <PopUpConfirmation confirmation={this.state.CurrentDemande} Accept={this.state.Accept} closeModal={this.closeModal} setData={this.setData}/>
		   		}
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Room number</th>
            <th>Type</th>
            <th>Status</th>
            <th>Comment</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

         {this.filterDemandes(this.state.Demandes).map((x, i) => <tr>
          <td>{x.id} </td>
          <td>{x.room_number} </td>
           <td>{x.type == 0 && "House Kepping" ||x.type == 1 && "Maintenance"} </td>
            <td className="status">{this.renderStatus(x.status)}</td>
            <td>{x.comment}</td>
            <td>{x.created_at.date }</td>
           <td>
             <div className="button_group">
         {x.status==0 ? <div className="accpet_button" onClick={()=>{this.setState({Accept:true});this.SetDemandes(x)}}>Accept</div>:<div className="done_button">Done</div>}
       
          </div>
          </td>
          </tr>)}
        </tbody>
      </table>
    </div>;
  }
}
ConciergeContainer.contextType = UserContext
export default ConciergeContainer;
