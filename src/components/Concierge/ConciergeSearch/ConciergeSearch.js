import React, { Component } from 'react';
import "./ConciergeSearch.scss";
import { NotifContext } from '../../Context'


class OrderReservationSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      room_number: '',
      status:'',
    }
    this.changeState = this.changeState.bind(this)
    this.changeType = this.changeType.bind(this)
    this.changeRoom = this.changeRoom.bind(this)
  }

  async changeType(e) {
    await this.setState({ type: e.target.value })
    this.props.update({ ...this.state })
  }

  async changeState(e) {
    await this.setState({ status: e.target.value })
    this.props.update({ ...this.state })
  }

  async changeRoom(e) {
        await this.setState({ room_number: e.target.value})
    this.props.update({ ...this.state })

  }

  async changeState(e) {
    await this.setState({ status: e.target.value })
    this.props.update({ ...this.state })
  }

  render() {
    console.log(this.context, "tttty")
    console.log(this.context.id, "tttty")
    console.log(localStorage.getItem('idNotif'), "tttty")


    return <div className="demandes-search">


      <input className="search" placeholder="Search Room Number " name="room_number" onInput={this.changeRoom}  />
      <select onInput={this.changeType} className="round">
        <option selected disabled hidden> Type </option>
        <option value="">All</option>
        <option value="0">HouseKeeping</option>
        <option value="1">Maintenance</option>
      </select>
      <select onInput={this.changeState} className="round">
        <option selected disabled hidden>State</option>
        <option value="">All</option>
        <option value="0">Waiting</option>
        <option value="1">Accepted</option>
      </select>
      <div className="time-filter">
      <div> <input onChange={e => this.props.update({ start_date: new Date(e.target.value).valueOf() / 1000 })} placeholder="Start Date" type="datetime-local" /> </div>
      <div> <input onChange={e => this.props.update({ end_date: new Date(e.target.value).valueOf() / 1000 })} placeholder="End Date" type="datetime-local" /> </div>
     </div>
    </div>;
  }
}
OrderReservationSearch.contextType = NotifContext

export default OrderReservationSearch;
