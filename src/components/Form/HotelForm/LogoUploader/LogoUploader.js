import React, { Component } from 'react';


import { UserContext } from '../../../Context';

import ImageUploader from 'react-images-upload';
import {  callApiWithBody } from '../../../../Helpers';

class LogoUploader extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
     

  
    }
 this.upload=this.upload.bind(this)
 
  }
  async componentDidMount() {
    document.querySelector('.fileContainer').style.backgroundImage=`url(${this.props.post.cover||''})`
  }
 
  async upload(e){
    let post = new FormData()
    post.append('image',document.getElementsByName('image')[0].files[0])
    let cover = await callApiWithBody('upload',post,'POST')
    this.props.setPost({cover:cover.cover})
    document.querySelector('.fileContainer').style.backgroundImage=`url(${cover.cover})`
    console.log(post,"postpostcover")

  }


  

  render() {
      console.log(this.props.post.cover,"posts")
  
    return <div className="form-one-item-hotel-edit">
    <label className="input-label-half-hotel-edit">logo</label>
  
    <ImageUploader
      onChange={this.upload} 
      label={'Max file size: 2MB | Allowed formats: jpg, png'}
      maxFileSize="2097152"
      name="image"
    />
</div>;
  }
}

LogoUploader.contextType = UserContext

export default LogoUploader;
