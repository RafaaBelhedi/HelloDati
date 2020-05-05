import React, { Component } from 'react';
import { callApi } from '../../Helpers';
import { UserContext } from '../Context';
import { Redirect } from 'react-router-dom'
import './Tourists.scss'
import DetailsGuest from '../UI/Details/DetailsGuest';
import { Link } from 'react-router-dom';

class Tourists extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      activePage: 1,
      tourists: [],
      devices: [],
      redirect: false,
      data: [],
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
  }

  async componentDidMount() {
    await this.getTourists();
    let tourists = await callApi('tourists', { hotel_id: this.context.hotel_id[0] });
    this.setState({ allTourists: tourists.data });
  }
  async getTourists() {
    let response = await callApi('tourists/paginate', { page: this.state.activePage, hotel_id: this.context.hotel_id[0] });
    this.setState({ tourists: response.data, perPage: response.meta.per_page, total: response.meta.total, lastPage: response.meta.last_page });
  }
  async getAllTourists() {
    let response = await callApi('tourists', { hotel_id: this.context.hotel_id[0] });
    this.setState({ tourists: response.data });
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  async handlePreviousPage() {
    await this.setState({ activePage: this.state.activePage - 1 });
    this.getTourists();
  }

  async handleNextPage() {
    await this.setState({ activePage: this.state.activePage + 1 });
    this.getTourists();
  }

  render() {
    if (this.state.redirect)
      return <Redirect to={"/add/guest"}></Redirect>
    return <div className="tourist-items">
      <div className='tourist-search-header'>
        <div className='tourist-search '>
        <div className="nameSearch"> <p>Search for a Guest</p></div> 
          <div className="inputs">
            <input placeholder='First Name/Last Name' onChange={(e) => this.setState({ first_name: e.target.value })} />
            <input placeholder='Room Number' onChange={(e) => this.setState({ room_number: e.target.value })} />
            <input placeholder='CIN/Passport' onChange={(e) => this.setState({ cin_number: e.target.value })} />
            <input placeholder='Nationality' onChange={(e) => this.setState({ country: e.target.value })} />
          </div>
        </div>
        <div className='tourist-Link-ajout ' onClick={() => this.setState({ redirect: true })} >
          <div className="tourist_image"><img src="/img/ui/ajjouter_client.png" /></div><Link to="/add/guest">Add Guest</Link>
        </div>
      </div>

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
            <th id="last">
              <span className="arrows-container">
                <span className="previous-arrow" onClick={this.handlePreviousPage} style={{ pointerEvents: this.state.activePage == 1 && 'none', opacity: this.state.activePage == 1 && 0.65 }}>&#60;</span>
                <span className="next-arrow" onClick={this.handleNextPage} style={{ pointerEvents: this.state.activePage == this.state.lastPage && 'none', opacity: this.state.activePage == this.state.lastPage && 0.65 }}>&#62;</span>
              </span>
              <span className="pagination">Page {this.state.activePage} of {this.state.lastPage}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.state.tourists
            .filter(x => new RegExp(this.state.cin_number).test(x.cin_number) || new RegExp(this.state.cin_number, 'i').test(x.passport_number))
            .filter(x => new RegExp(this.state.first_name, 'i').test(x.first_name) || new RegExp(this.state.first_name, 'i').test(x.last_name))
            .filter(x => new RegExp(this.state.room_number, 'i').test(x.stay.device_room.room.room_number))
            .filter(x => new RegExp(this.state.country, 'i').test(x.country)).map((tourist, i) =>
              <tr>
                <td>{tourist.first_name + ' ' + tourist.last_name}</td>
                <td>{tourist.gender == 2 && "Female" || tourist.gender == 1 && "Male" || tourist.gender == 0 && "Other"}</td>
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
          {/* {this.state.activePage != 1 && <button className="previous" onClick={this.handlePreviousPage}><span>&#60;</span></button>}
          {this.state.activePage != this.state.total && <button className="next" onClick={this.handleNextPage}><span>&#62;</span></button>} */}

        </tbody>
      </table>
    </div>;
  }
}

Tourists.contextType = UserContext

export default Tourists;
