import React, { Component } from 'react';
import './AddHotelSection.scss'


class AddHotelDeux extends Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = { hotel: this.props.hotel }

  }


  render() {
    return <>

      <div className="form-grouping-half-hotel-add">


        <input
          type="text"
          required
          placeholder="continent"
          value={this.props.hotel.continent || ''}
          onChange={(e) => this.props.setData({ continent: e.target.value })}
          className="input-half-hotel-add" />


        <input
          type="text"
          required
          placeholder="chain"
          value={this.props.hotel.chain || ''}
          onChange={(e) => this.props.setData({ chain: e.target.value })}
          className="input-half-hotel-add" />

        <input
          type="number"
          required
          placeholder="stars"
          value={this.props.hotel.stars || ''}
          onChange={(e) => this.props.setData({ stars: e.target.value })}
          className="input-half-hotel-add" />

        <input
          type="text"
          required
          placeholder="address"
          value={this.props.hotel.address || ''}
          onChange={(e) => this.props.setData({ address: e.target.value })}
          className="input-half-hotel-add" />







      </div>
    </>;
  }
}

export default AddHotelDeux;
