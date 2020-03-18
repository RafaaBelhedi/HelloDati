import React, { Component } from 'react';
import './LocationPage.scss'

class LocationPage extends Component {
  render() {
    return <>
      <div className="form-grouping-half">
        <label className="input-label-full">Location (name)</label>
        <input type="text" value={this.props.data.location} placeholder="Location" onChange={(e) => this.props.setData({ location: e.target.value })} className="input-full" />
        <label className="input-label-full">Location (coordinates)</label>
        <input type="text" value={this.props.data.location_coordinates} placeholder="Coordinates" onChange={(e) => this.props.setData({ location_coordinates: e.target.value })} className="input-full" />
      </div>
    </>;
  }
}

export default LocationPage;
