import React, { Component } from 'react';
// import './SectionEitHotel.scss'



class HotelFormDeux extends Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = { tourist: this.props.tourist }
  }
  // componentDidMount(){
  //   console.log("welcome")
  //   console.log(this.props.hotel.hotel_name,"hotel-name")
  // }

  render() {
    return <>

      <div className="form-grouping-half-hotel-edit">
        <label className="input-label-half-hotel-edit"> Email</label>
        <label className="input-label-half-hotel-edit">Born</label>

        <input
          type="text"
          placeholder="email"
          value={this.props.tourist.email || ''}
          onChange={(e) => this.props.setData({ email: e.target.value })}
          className="input-half-hotel-edit" />


        <input
          type="text"
          placeholder="born"
          value={this.props.tourist.born || ''}
          onChange={(e) => this.props.setData({ born: e.target.value })}
          className="input-half-hotel-edit" />
      </div>
      <div className="form-grouping-half-hotel-edit">
        <label className="input-label-half-hotel-edit"> phone_number</label>
        <label className="input-label-half-hotel-edit">cin_number</label>
        <input
          type="text"
          placeholder="phone_number"
          value={this.props.tourist.phone_number || ''}
          onChange={(e) => this.props.setData({ phone_number: e.target.value })}
          className="input-half-hotel-edit" />

        <input
          type="text"
          placeholder="cin_number"
          value={this.props.tourist.cin_number || ''}
          onChange={(e) => this.props.setData({ cin_number: e.target.value })}
          className="input-half-hotel-edit" />







      </div>
    </>;
  }
}

export default HotelFormDeux;
