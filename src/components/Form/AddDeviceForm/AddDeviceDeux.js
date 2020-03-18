import React, { Component } from 'react';
import './AddDeviceSection.scss'
import { UserContext } from '../../Context'

class AddDeviceDeux extends Component {
  constructor(props, context) {
    super(props)
    this.state = { device: this.props.device }
  }
  render() {
    return <>

      <div className="form-grouping-half-device-add">

        <input
          type="text"
          required
          placeholder="phone"
          value={this.props.device.phone || ''}
          onChange={(e) => this.props.setData({ phone: e.target.value })}
          className="input-half-device-add" />


        <select name="hotel_id" onChange={(e) => this.props.setData({ hotel_id: e.target.value })}>
          <option selected disabled hidden>Hotel ID</option>
          {this.context.hotel_id.filter((x, i) => i != 0).map(x => <option value={x}>{x}</option>)}
        </select>

        <select onChange={(e) => this.props.setData({ intra_flotte: e.target.value })}>
          <option selected disabled hidden>Intra Flotte?</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>

        <select onChange={(e) => this.props.setData({ status: e.target.value })}>
          <option selected disabled hidden>Status</option>
          <option value="0">Inactive</option>
          <option value="1">Active</option>
        </select>

        <select>
          {/* {this.props.rooms.map(room => {
            <option>{room.room_number}</option>
          })} */}

        </select>



      </div>
    </>;
  }
}
AddDeviceDeux.contextType = UserContext
export default AddDeviceDeux;
