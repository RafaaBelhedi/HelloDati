import React, { Component } from 'react';
import './AddHotelSection.scss'
import ImageUploader from 'react-images-upload';
import { callApi, callApiWithBody } from '../../../Helpers';

class AddServiceOne extends Component {
  constructor(props) {

    super(props)
    this.state = { services: this.props.services }
    this.upload = this.upload.bind(this)
  }
  componentDidMount() {
    document.querySelector('.fileContainer').style.backgroundImage = `url(${this.props.services.image || ''})`
  }
  async upload(e) {
    let services = new FormData()
    services.append('image', document.getElementsByName('image')[0].files[0])
    let image = await callApiWithBody('upload', services, 'POST')
    this.props.setData({ image: image.image })
    document.querySelector('.fileContainer').style.backgroundImage = `url(${image.image})`

  }


  render() {
    return <>

      <div className="form-grouping-half-hotel-add">

        <ImageUploader
          onChange={this.upload}
          label={'Max file size: 2MB | Allowed formats: jpg, png'}
          maxFileSize="2097152"
          name="image"
        />

        <input
          type="text"
          required
          placeholder="Title"
          value={this.props.services.title || ''}
          onChange={(e) => this.props.setData({ title: e.target.value })}
          className="input-half-hotel-add" />


        <input
          type="text"
          required
          placeholder="categories"
          value={this.props.services.categories || ''}
          onChange={(e) => this.props.setData({ categories: e.target.value })}
          className="input-half-hotel-add" />










      </div>
    </>;
  }
}

export default AddServiceOne;
