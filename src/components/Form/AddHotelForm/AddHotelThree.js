import React, { Component } from 'react';
import './AddHotelSection.scss'


class AddHotelThree extends Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = { hotel: this.props.hotel }
  }


  render() {
    return <>

      <div className="form-grouping-half-hotel-add">



        <input
          type="email"
          required
          placeholder="email"
          value={this.props.hotel.email || ''}
          onChange={(e) => this.props.setData({ email: e.target.value })}
          className="input-half-hotel-add" />


        <input
          type="text"
          required
          placeholder="facebook"
          value={this.props.hotel.facebook || ''}
          onChange={(e) => this.props.setData({ facebook: e.target.value })}
          className="input-half-hotel-add" />

        <input
          type="text"
          required
          placeholder="twitter"
          value={this.props.hotel.twitter || ''}
          onChange={(e) => this.props.setData({ twitter: e.target.value })}
          className="input-half-hotel-add" />

        <input
          type="text"
          required
          placeholder="youtube"
          value={this.props.hotel.youtube || ''}
          onChange={(e) => this.props.setData({ youtube: e.target.value })}
          className="input-half-hotel-add" />

        <input
          type="text"
          required
          placeholder="trip_advisor_url"
          value={this.props.hotel.trip_advisor_url || ''}
          onChange={(e) => this.props.setData({ trip_advisor_url: e.target.value })}
          className="input-half-hotel-add" />







      </div>
    </>;
  }
}

export default AddHotelThree;
