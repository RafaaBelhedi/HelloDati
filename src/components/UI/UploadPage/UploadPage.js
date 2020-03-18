import React, { Component } from 'react';
import './UploadPage.scss'
import ImageUploader from 'react-images-upload';
import { callApi, callApiWithBody } from '../../../Helpers';
import Cropper from 'react-easy-crop'

class UploadPage extends Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = { data: { ...this.props.data }, crop: { x: 0, y: 0 }, zoom: 0 }
    this.upload = this.upload.bind(this)
  }

  handleChange(e) {
    this.props.setData({
      title: e.target.value
    });
  }

  async upload(e) {
    let data = new FormData()
    data.append('image', document.getElementsByName('image')[0].files[0])
    let image = await callApiWithBody('upload', data, 'POST')
    this.setState({ image: image.image })
    this.props.setData({ image: image.image, imagePreviewUrl: image.image })
    // document.querySelector('.fileContainer').style.backgroundImage = `url(${image.image})`
  }

  componentDidMount() {
    // window.alert(this.state.data.title);
  }

  render() {
    return <>
      <label>Image</label>
      <br></br>
      <ImageUploader
        onChange={this.upload}
        label={'Max file size: 2MB | Allowed formats: jpg, png'}
        maxFileSize="2097152"
        name="image"
      />
      <div className="form-grouping-half">
        <label className="input-label-half">Title</label>
        <label className="input-label-half">Title (fr)</label>
        <input
          placeholder="Title"
          value={this.props.data.title || ''}
          onChange={this.handleChange.bind(this)}
          className="input-half" />
        <input
          placeholder="Title (Fr)"
          value={this.props.data.title_fr || ''}
          onChange={(e) => this.props.setData({ title_fr: e.target.value })}
          className="input-half" />
      </div>

    </>;
  }
}

export default UploadPage;