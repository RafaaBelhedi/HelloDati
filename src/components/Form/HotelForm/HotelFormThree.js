import React, { Component } from 'react';
import './SectionEitHotel.scss'


class HotelFormThree extends Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = { hotel: this.props.hotel }
  }
  componentDidMount() {
    console.log("welcome")
    console.log(this.props.hotel.hotel_name, "hotel-name")
  }

  render() {
    return <>

      <div className="form-grouping-half-hotel-edit">
        <label className="input-label-half-hotel-edit"> Email</label>
        <label className="input-label-half-hotel-edit">facebook</label>

        <input
          type="text"
          placeholder="email"
          value={this.props.hotel.email || ''}
          onChange={(e) => this.props.setData({ email: e.target.value })}
          className="input-half-hotel-edit" />


        <input
          type="text"
          placeholder="facebook"
          value={this.props.hotel.facebook || ''}
          onChange={(e) => this.props.setData({ facebook: e.target.value })}
          className="input-half-hotel-edit" />
      </div>
      <div className="form-grouping-half-hotel-edit">
        <label className="input-label-half-hotel-edit"> Twitter</label>
        <label className="input-label-half-hotel-edit">Youtube</label>

        <input
          type="text"
          placeholder="twitter"
          value={this.props.hotel.twitter || ''}
          onChange={(e) => this.props.setData({ twitter: e.target.value })}
          className="input-half-hotel-edit" />

        <input
          type="text"
          placeholder="youtube"
          value={this.props.hotel.youtube || ''}
          onChange={(e) => this.props.setData({ youtube: e.target.value })}
          className="input-half-hotel-edit" />
      </div>
      <div className="form-grouping-half-hotel-edit">
        <label className="input-label-half-hotel-edit"> Trip Advisor Url</label>

        <input
          type="text"
          placeholder="trip_advisor_url"
          value={this.props.hotel.trip_advisor_url || ''}
          onChange={(e) => this.props.setData({ trip_advisor_url: e.target.value })}
          className="input-half-hotel-edit" />







      </div>
    </>;
  }
}

export default HotelFormThree;
