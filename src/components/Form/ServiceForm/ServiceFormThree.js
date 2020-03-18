import React, { Component } from 'react';
// import './SectionEitHotel.scss'



class ServiceFormThree extends Component {
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
          className="input-half-hotel-edit" />


        <input
          type="text"
          placeholder="born"
          className="input-half-hotel-edit" />
      </div>
      <div className="form-grouping-half-hotel-edit">
        <label className="input-label-half-hotel-edit"> phone_number</label>
        <label className="input-label-half-hotel-edit">cin_number</label>
        <input
          type="text"
          placeholder="phone_number"
          className="input-half-hotel-edit" />

        <input
          type="text"
          placeholder="cin_number"
          className="input-half-hotel-edit" />







      </div>
    </>;
  }
}

export default ServiceFormThree;
