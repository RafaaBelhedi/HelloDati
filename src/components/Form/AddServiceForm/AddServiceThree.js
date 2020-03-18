import React, { Component } from 'react';
import './AddHotelSection.scss'
import ImageUploader from 'react-images-upload';
import { callApi, callApiWithBody } from '../../../Helpers';

class AddHotelUn extends Component {
  constructor(props) {
    console.log(props)
    super(props)

  }
  componentDidMount() {

  }


  render() {
    return <>

      <div className="form-grouping-half-hotel-add">


        <input
          type="text"
          placeholder="hotel name"
          value=''
          className="input-half-hotel-add" />


        <input
          type="text"
          placeholder="city"
          value=''
          className="input-half-hotel-add" />

        <input
          type="text"
          placeholder="country"
          value=''
          className="input-half-hotel-add" />

        <input
          type="text"
          placeholder="region"
          value=''
          className="input-half-hotel-add" />







      </div>
    </>;
  }
}

export default AddHotelUn;
