import React, { Component } from 'react';
import './AddHotelSection.scss'
import ImageUploader from 'react-images-upload';
import { callApi, callApiWithBody } from '../../../Helpers';

class AddHotelUn extends Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = { hotel: this.props.hotel }
    // this.upload = this.upload.bind(this)
  }
  componentDidMount() {
    console.log("welcome")
    console.log(this.props.hotel.hotel_name, "hotel-name")
  }
  // async upload(e){
  //   let hotel = new FormData()
  //   hotel.append('image',document.getElementsByName('image')[0].files[0])
  //   let image = await callApiWithBody('upload',hotel,'POST')
  //   this.props.setData({image:image.image})
  //   document.querySelector('.fileContainer').style.backgroundImage=`url(${image.image})`
  //   console.log(this.state)
  // }

  // componentDidMount(){
  //   document.querySelector('.fileContainer').style.backgroundImage=`url(${this.props.hotel.image||''})`
  // }

  render() {
    return <>

      <div className="form-grouping-half-hotel-add">
        {/* 
      <ImageUploader
        onChange={this.upload} 
        label={'Max file size: 2MB | Allowed formats: jpg, png'}
        maxFileSize="2097152"
        name="image"
      /> */}

        <input
          type="text"
          required
          placeholder="hotel name"
          value={this.props.hotel.hotel_name || ''}
          onChange={(e) => this.props.setData({ hotel_name: e.target.value })}
          className="input-half-hotel-add" />


        <input
          type="text"
          required
          placeholder="city"
          value={this.props.hotel.city || ''}
          onChange={(e) => this.props.setData({ city: e.target.value })}
          className="input-half-hotel-add" />

        <input
          type="text"
          required
          placeholder="country"
          value={this.props.hotel.country || ''}
          onChange={(e) => this.props.setData({ country: e.target.value })}
          className="input-half-hotel-add" />

        <input
          type="text"
          required
          placeholder="region"
          value={this.props.hotel.region || ''}
          onChange={(e) => this.props.setData({ region: e.target.value })}
          className="input-half-hotel-add" />







      </div>
    </>;
  }
}

export default AddHotelUn;
