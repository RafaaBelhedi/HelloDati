import React, { Component } from 'react';
import { callApi } from '../../Helpers';
import { UserContext } from '../Context';
import { Redirect } from 'react-router-dom'
import TouristCard from '../UI/TouristCard/TouristCard';
import './Tourists.scss'
import Popup from "reactjs-popup";
import DetailsGuest from '../UI/Details/DetailsGuest';
import { Link } from 'react-router-dom'


class Tourists extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      tourists: [],
      devices: [],
      redirect: false
    }
  }

  async componentDidMount() {
    let tourists = await callApi('tourists/get', { hotel_id: this.context.hotel_id[0] })
    this.setState({ tourists: tourists.data });
  }
  render() {
    if (this.state.redirect)
      return <Redirect to={"/add/guest"}></Redirect>
    return <div className="tourist-items">
      <div className='tourist-search-header'>
        <div className='tourist-search '>
          <p>Search for a Guest</p>
          <div className="inputs">
            <input placeholder='First Name/Last Name' onChange={(e) => this.setState({ first_name: e.target.value })} />
            <input placeholder='Room Number' onChange={(e) => this.setState({ room_number: e.target.value })} />
            <input placeholder='CIN/Passport' onChange={(e) => this.setState({ cin_number: e.target.value })} />
            <input placeholder='Nationality' onChange={(e) => this.setState({ country: e.target.value })} />
          </div>
        </div>
        <div className='tourist-Link-ajout ' onClick={() => this.setState({ redirect: true })} >
          <div className="tourist_image"><img src="/img/ui/ajjouter_client.png" /></div><Link to="/add/guest">Add Guest</Link>
        </div></div>
      <table>
        <thead>
          <tr>

            <th id="first">Guest Name</th>
            <th>Gender</th>
            <th>Born</th>
            <th>Room</th>
            <th>Cin/Passport</th>
            <th>Check in</th>
            <th>Check out</th>
            <th id="last"></th>
          </tr>
        </thead>
        <tbody>

          {this.state.tourists
            .filter(x => new RegExp(this.state.cin_number).test(x.cin_number) || new RegExp(this.state.cin_number, 'i').test(x.passport_number))
            .filter(x => new RegExp(this.state.first_name, 'i').test(x.first_name) || new RegExp(this.state.first_name, 'i').test(x.last_name))
            .filter(x => new RegExp(this.state.room_number, 'i').test(x.stay.device_room.room.room_number))
            .filter(x => new RegExp(this.state.country, 'i').test(x.country)).map((tourist, i) => <tr>
              <td>{tourist.first_name + ' ' + tourist.last_name}</td>
              <td>{tourist.gender == 2 && "female" || tourist.gender == 1 && "Male" || tourist.gender == 0 && "Other"}</td>
              <td>{tourist.born}</td>
              <td>{tourist.stay.device_room.room.room_number != undefined ? tourist.stay.device_room.room.room_number : 'Not affected'}</td>
              <td>{tourist.cin_number}</td>
              <td>{tourist.check_in}</td>
              <td>{tourist.check_out}</td>
              <td>
                <div className="icons">
                  <span><DetailsGuest detail={tourist} /></span>
                  <span className="edit_icon"><Link to={'/edit/guest/' + tourist.id}><img src="img/ui/edit-icon.svg" alt="edit" /></Link></span>

                </div>
              </td>
            </tr>)}
        </tbody>
      </table>
    </div>;
  }
}

Tourists.contextType = UserContext

export default Tourists;
