import React, { Component } from 'react';
import "./OrderReservationSearch.scss";
import { NotifContext } from '../../Context'


class OrderReservationSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      room: '',
      tourist: '',
      device: '',
      reservation: '',
      status: '',
      device_imei: '',
      search_type: 0,
      search_text: '',
      search_placeholder: 'Select Search Type',
    }
    this.changeType = this.changeType.bind(this)
    this.changeState = this.changeState.bind(this)
    this.changeReservation = this.changeReservation.bind(this)
    this.changeSearch = this.changeSearch.bind(this)
  }

  async changeReservation(e) {
    await this.setState({ reservation: e.target.value })
    this.props.update({ ...this.state })
  }

  async changeState(e) {
    await this.setState({ status: e.target.value })
    this.props.update({ ...this.state })
  }

  async changeSearch(e) {
    await this.setState({ search_text: e.target.value })
    switch (this.state.search_type) {
      case "1":
        await this.setState({
          room: this.state.search_text,
        })
        break;
      case "2":
        await this.setState({
          device_imei: this.state.search_text,
        })
        break;
      case "3":
        console.log(3)
        await this.setState({
          tourist: this.state.search_text,
        })
        break;
    }
    this.props.update({ ...this.state })

  }

  async changeType(e) {
    const value = e.target.value
    this.setState({
      tourist: '',
      room: '',
      device_imei: '',
    })
    switch (value) {
      case "0":
        await this.setState({
          placeholder: 'Select Search Type'
        })
        break
      case "1":
        await this.setState({
          room: this.state.search_text,
          search_type: 1,
          search_placeholder: "Room Number"
        })
        break;
      case "2":
        await this.setState({
          device_imei: this.state.search_text,
          search_type: 2,
          search_placeholder: "Device IMEI"
        })
        break;
      case "3":
        console.log(3)
        await this.setState({
          tourist: this.state.search_text,
          search_type: 3,
          search_placeholder: "Guest Name"
        })
        break;
    }
    console.log(this.state)
    await this.setState({ search_type: value, search_text: "" })
    this.props.update({ ...this.state })
  }

  render() {
    console.log(this.context, "tttty")
    console.log(this.context.id, "tttty")
    console.log(sessionStorage.getItem('idNotif'), "tttty")


    return <div className="history-search">

      <select onInput={this.changeType} className="round first">
        <option value="0">Search type</option>
        <option value="1">Room</option>
        <option value="2">Device</option>
        <option value="3">Guest</option>
      </select>
      <input className="search" placeholder={this.state.search_placeholder} onInput={this.changeSearch} disabled={!this.state.search_type} value={this.state.search_text} />
      <select onInput={this.changeReservation} className="round">
        <option value="">Order/Reservation</option>
        <option value="0">Order</option>
        <option value="1">Reservation</option>
      </select>
      <select onInput={this.changeState} className="round">
        <option value="">State</option>
        <option value="1">Waiting</option>
        {/* <option value="2">In Progress</option> */}
      </select>
      <div> <input onChange={e => this.props.update({ start_date: new Date(e.target.value).valueOf() / 1000 })} placeholder="Start Date" type="datetime-local" /> </div>
      <div> <input onChange={e => this.props.update({ end_date: new Date(e.target.value).valueOf() / 1000 })} placeholder="End Date" type="datetime-local" /> </div>
      {this.context.id == 0 ?
        "" : <div className="select_all" onClick={() => { this.context.setId(0) }}>
          <img src="/img/ui/selectAll.png" style={{ width: "20px", height: "20px" }} />
          <p>See all</p>
        </div>}
    </div>;
  }
}
OrderReservationSearch.contextType = NotifContext

export default OrderReservationSearch;
