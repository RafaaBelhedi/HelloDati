import React, { Component } from 'react';
import FormNavigator from '../../UI/FormNavigator'
import UploadPage from '../../UI/UploadPage';
import DescriptionPage from '../../UI/DescriptionPage';
import { callApi } from '../../../Helpers';
import { UserContext } from '../../Context'
import { Redirect } from 'react-router-dom'
import './RestaurantUpdateForm.scss';

class RestaurantUpdateForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      id: this.props.match.params.id,
      data: { id: this.id }
    }
    this.setData = this.setData.bind(this)
    this.send = this.send.bind(this)
  }

  setData(data) {
    this.setState({ data: { ...this.state.data, ...data } })
  }

  async send() {
    await callApi('post/' + this.state.id, this.state.data, 'PUT')
    if (this.state.data.title_fr) {
      let translate_data = { post_id: this.state.id }
      translate_data.title = this.state.data.title_fr
      translate_data.description = this.state.data.description_fr || ''
      translate_data.lang_iso = 'fr'
      translate_data.summery = this.state.data.summery_fr || ''
      let translate = await callApi('posts_translate', translate_data, 'POST')
    }
    // this.setState({redirect:true})
    // window.location.href = new URLSearchParams(window.location.search).get('return')
  }

  async componentDidMount() {
    let data = await callApi('post/' + this.state.id)
    this.setState({ data: data.data[0] });
  }
  ellipsis(promo) {
    promo = String(promo);
    return promo.substring(0, 3);
  }

  render() {
    return <div>
      <div className="restaurant-form-container">
        <div className="restaurant-left-preview">
          <div className="restaurant-arrow-right" style={{ display: !this.state.data.image ? 'none' : '' }}></div>
          <img src="/img/ui/c15pro.png" alt="phone_photo" className="restaurant-c15-phone" />
          <div className="restaurant-preview-box">
            <p style={{ color: this.props.themeColor }}>{this.state.data.title}</p>
            <img src={this.state.data.image ? this.state.data.image : "/img/ui/no-photo.png"} style={{ borderLeft: !this.state.data.image ? '1px dashed gray' : '' }} alt="Preview Template" />
          </div>

        </div>
        <FormNavigator data={this.state.data} send={this.send}>
          <UploadPage title='Image + Title' setData={this.setData} data={this.state.data} />
          <DescriptionPage title='Description' setData={this.setData} data={this.state.data} />
        </FormNavigator>
      </div>

    </div>
  }
}

RestaurantUpdateForm.contextType = UserContext

export default RestaurantUpdateForm;
