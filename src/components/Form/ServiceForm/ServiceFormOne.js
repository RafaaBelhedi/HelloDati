import React, { Component } from 'react';
import { callApi, callApiWithBody } from '../../../Helpers';
import ImageUploader from 'react-images-upload';
class ServiceFormOne extends Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = { service: this.props.service }
    this.upload = this.upload.bind(this)
  }
  componentDidMount() {
    document.querySelector('.fileContainer').style.backgroundImage = `url(${this.props.service.image || ''})`
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

      <div className="form-grouping-half-hotel-edit">


        <label>Image</label>
        <ImageUploader
          onChange={this.upload}
          label={'Max file size: 2MB | Allowed formats: jpg, png'}
          maxFileSize="2097152"
          name="image"
        />

        <label className="input-label-half-hotel-edit"> Title</label>
        <label className="input-label-half-hotel-edit">Categories</label>

        <input
          type="text"
          placeholder="Title"
          value={this.props.service.title || ''}
          onChange={(e) => this.props.setData({ title: e.target.value })}
          className="input-half-hotel-add" />


        <input
          type="text"
          placeholder="categories"
          value={this.props.service.categories || ''}
          onChange={(e) => this.props.setData({ categories: e.target.value })}
          className="input-half-hotel-add" />





      </div>

    </>;
  }
}

export default ServiceFormOne;
