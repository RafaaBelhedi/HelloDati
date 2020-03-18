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
          required
          placeholder="content_manager"
          value={this.props.services.content_manager || ''}
          onChange={(e) => this.props.setData({ content_manager: e.target.value })}
          className="input-half-hotel-add" />


        <input
          type="text"
          required
          placeholder="type"
          value={this.props.services.type || ''}
          onChange={(e) => this.props.setData({ type: e.target.value })}
          className="input-half-hotel-add" />


        <input
          type="text"
          required
          placeholder="state"
          value={this.props.services.state || ''}
          onChange={(e) => this.props.setData({ state: e.target.value })}
          className="input-half-hotel-add" />



        <input
          type="text"
          required
          placeholder="Title Color"
          value={this.props.services.title_color || ''}
          onChange={(e) => this.props.setData({ title_color: e.target.value })}
          className="input-half-hotel-add" />










      </div>
    </>;
  }
}

export default AddHotelUn;
