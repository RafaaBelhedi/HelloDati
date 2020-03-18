import React, { Component } from 'react';
import { callApi } from '../../Helpers';
import { UserContext } from '../Context'
import HotelCard from '../UI/HotelCard/HotelCard';
import './Hotels.scss'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'

class Hotels extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
   
      hotels:[],
      redirect:false
    }
  }

  async componentDidMount() {
    let hotels = await callApi('hotels')
    console.log(hotels)
    this.setState({ hotels: hotels.data })
    
  }



  render() {
    if(this.state.redirect)
    return <Redirect to={"/add/hotel"}></Redirect>
    return <div style={{ justifyContent: 'space-between' }} className="hotel-container">
    <div className='hotel-search-header'>

      <div className='hotel-search '>
        <div> <p>Search Hotel</p></div>
        <div> <input placeholder=' Hotel Name' onChange={(e) => this.setState({ hotel_name: e.target.value })} /></div>
      </div>
      {this.context.role==3?
      <div className='hotel-Link-ajout '  onClick={()=>this.setState({redirect:true})} >
    
      <div><img src="/img/ui/add_room.png" /></div>
      <div><Link to="/add/hotel">Add Hotel</Link></div>
      </div>
      :''}
      
      </div>
      <div className='hotel-list '>
        {this.state.hotels
          .filter(x => new RegExp(this.state.hotel_name, 'i').test(x.hotel_name))
          .map(x => (
            
            <HotelCard hotel={x}></HotelCard>
          ))
        }
      </div>
    </div>;
  }
}

Hotels.contextType = UserContext

export default Hotels;
