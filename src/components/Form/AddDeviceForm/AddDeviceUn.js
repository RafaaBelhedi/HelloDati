import React, { Component } from 'react';
import './AddDeviceSection.scss'
import { callApi } from '../../../Helpers';

class AddDeviceUn extends Component {
  constructor(props) {
    super(props)
    this.state = { device: this.props.device }

  }


  render() {
    return <>
      <div className="form-grouping-half-device-add">
        <input
          type="text"
          required
          placeholder="imei"
          value={this.props.device.imei || ''}
          onChange={(e) => this.props.setData({ imei: e.target.value })}
          className="input-half-device-add" />


        <input
          type="text"
          required
          placeholder="call_time"
          value={this.props.device.call_time || ''}
          onChange={(e) => this.props.setData({ call_time: e.target.value })}
          className="input-half-device-add" />


        <input
          type="number"
          required
          placeholder="number"
          value={this.props.device.number || ''}
          onChange={(e) => this.props.setData({ number: e.target.value })}
          className="input-half-device-add" />

        <input
          type="text"
          required
          placeholder="call_limit"
          value={this.props.device.call_limit || ''}
          onChange={(e) => this.props.setData({ call_limit: e.target.value })}
          className="input-half-device-add" />
      </div>
    </>;
  }
}

export default AddDeviceUn;
