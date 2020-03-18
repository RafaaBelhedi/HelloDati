import React, { Component } from 'react';
import './HotelCard.scss'
import {Link} from 'react-router-dom'
import { UserContext } from '../../Context';
import Popup from "reactjs-popup";
import { callApi } from '../../../Helpers';

class HotelCard extends Component {

  constructor(props,context){
    super(props, context)
    this.state = {
   
    }
  }
  async onDelete(id){

    let x = await callApi('hotel/'+this.props.hotel.id, 'DELETE')
    console.log(x)
    console.log("room delete")
  }

 



  render() {
    console.log(this.props.room)
    return <div className="hotel-card">
      <div className="hotel-details">
        <p>Hotel Name: {this.props.hotel.hotel_name} </p> Hotel Id: {this.props.hotel.id} 
     
       <p> Region:{this.props.hotel.region||""}/City: {this.props.hotel.city}/Country: {this.props.hotel.country}</p> 
      </div>
      <div className="hotel-button">
      <Link to={'/edit/hotel/'+this.props.hotel.id}>
          <button>Details ></button>
        </Link>
        <Link to={'/edit/hotel/'+this.props.hotel.id}>
          <button>Modifier</button>
        </Link>



      <Popup trigger={<div>  <img src="/img/ui/supprimer.png" /> </div>} modal>
    
    {close => (


<div className="actions">
<p className="header"  style={{marginBottom:"15px"}}> Are you sure to delete this Hotel ? </p>
<div className="button_actions">
  <img src="/img/ui/btn_valider.png" onClick={()=>callApi('hotel/'+this.props.hotel.id,{}, 'DELETE')} />
  <img src="/img/ui/btn_annuler.png" onClick={() => { close(); }} />
</div>
</div>
 
    )}
   
  </Popup> 
     
      </div> 
    </div>;
  }
}
HotelCard.contextType = UserContext

export default HotelCard;
