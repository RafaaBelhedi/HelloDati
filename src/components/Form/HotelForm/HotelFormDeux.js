import React, { Component } from 'react';
import './SectionEitHotel.scss';
import ImageUploader from 'react-images-upload';
import { callApi, callApiWithBody } from '../../../Helpers';



class HotelFormDeux extends Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = {
      hotel: this.props.hotel,
      post: { ...this.props.children.post }
    }
    this.upload = this.upload.bind(this)
  }



  componentDidMount() {
    document.querySelector('.fileContainer').style.backgroundImage = `url(${this.props.children.post.cover || ''})`
  }
  async upload(e) {
    let post = new FormData()
    post.append('image', document.getElementsByName('image')[0].files[0])
    let cover = await callApiWithBody('upload', post, 'POST')
    this.props.setPost({ cover: cover.cover })
    document.querySelector('.fileContainer').style.backgroundImage = `url(${cover.cover})`
  }

  render() {
    return <>

      <div className="form-grouping-half-hotel-edit">
        <label className="input-label-half-hotel-edit"> continent</label>
        <label className="input-label-half-hotel-edit">Chain</label>

        <input
          type="text"
          placeholder="continent"
          value={this.props.hotel.continent || ''}
          onChange={(e) => this.props.setData({ continent: e.target.value })}
          className="input-half-hotel-edit" />


        <input
          type="text"
          placeholder="chain"
          value={this.props.hotel.chain || ''}
          onChange={(e) => this.props.setData({ chain: e.target.value })}
          className="input-half-hotel-edit" />
      </div>
      <div className="form-grouping-half-hotel-edit">
        <label className="input-label-half-hotel-edit"> stars</label>
        <label className="input-label-half-hotel-edit">Address</label>
        <input
          type="text"
          placeholder="stars"
          value={this.props.hotel.stars || ''}
          onChange={(e) => this.props.setData({ stars: e.target.value })}
          className="input-half-hotel-edit" />

        <input
          type="text"
          placeholder="address"
          value={this.props.hotel.address || ''}
          onChange={(e) => this.props.setData({ address: e.target.value })}
          className="input-half-hotel-edit" />


      </div>
      <div className="form-grouping-half-hotel-edit">
        <label className="input-label-half-hotel-edit">logo</label>

        <ImageUploader
          onChange={this.upload}
          label={'Max file size: 2MB | Allowed formats: jpg, png'}
          maxFileSize="2097152"
          name="image"
        />
      </div>
    </>;
  }
}

export default HotelFormDeux;
