import React, { Component } from 'react';
import { callApi } from '../../Helpers';
import { UserContext } from '../Context'
import RoomCard from '../UI/RoomCard/RoomCard';
import './Rooms.scss'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import { StickyContainer, Sticky } from 'react-sticky';

class Rooms extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {

      rooms: [],
      redirect: false,
    }
    this.updateTheState = this.updateTheState.bind(this);
  }

  async componentDidMount() {

    let rooms = await callApi('rooms', { hotel_id: this.context.hotel_id[0] })
    this.setState({ rooms: rooms.data })

  }
  async updateTheState(id, hotelId) {
    let result = await callApi('room/' + id, {}, 'DELETE');
    let rooms = await callApi('rooms', { hotel_id: hotelId });
    this.setState({ rooms: rooms.data });
    let parameters = {
      title: "Success",
      message: "The room has been successfully deleted",
      type: "success",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 4000,
        onScreen: false
      }
    }
    if (result === 0) {
      parameters['type'] = "danger";
      parameters['title'] = "Error";
      parameters['message'] = "You can't delete this room cause it's linked to device(s)";
    }

    store.addNotification(parameters);
  }

  render() {
    if (this.state.redirect)
      return <Redirect to={"/add/room"}></Redirect>

    return <StickyContainer>
      <div style={{ justifyContent: 'space-between' }} className="room-container">
        <ReactNotification />
        <Sticky>
          {({ style,
            isSticky,
            wasSticky,
            distanceFromTop,
            distanceFromBottom,
            calculatedHeight
          }) => (

              <div className='room-search-header'>

                <div className='room-search '>
                  <div> <p>Room Search</p></div>
                  <div className='room-search-input '>
                    <div> <input placeholder='Room Number' onChange={(e) => this.setState({ room_number: e.target.value })} /></div>
                    <div> <input placeholder='Guest Name' onChange={(e) => this.setState({ tourist_name: e.target.value })} /></div>
                  </div>



                </div>
                {this.context.role == 3 || this.context.role === 2 ?
                  <div className='room-Link-ajout ' onClick={() => this.setState({ redirect: true })}>

                    <div><img src="/img/ui/add_room.png" /></div>
                    <div><Link to="/add/room">Add Room</Link></div>
                  </div>
                  : ''}

              </div>
            )}
        </Sticky>
        <div id="flash_message"></div>
        <div className='room-list '>
          {this.state.rooms
            .filter(x => new RegExp(this.state.tourist_name, 'i').test(x.tourist_name))
            .filter(x => new RegExp(this.state.room_number, 'i').test(x.room_number))
            .filter(x => new RegExp(this.state.device_imei, 'i').test(x.device_imei))


            .map(x => (
              <RoomCard room={x} onDelete={this.updateTheState}></RoomCard>
            ))
          }
        </div>

      </div>

    </StickyContainer>;
  }
}

Rooms.contextType = UserContext

export default Rooms;
