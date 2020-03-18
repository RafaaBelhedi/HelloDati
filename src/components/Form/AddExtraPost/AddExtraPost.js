import React, { Component } from 'react';
import FormNavigator from '../../UI/FormNavigator'
import UploadPage from '../../UI/UploadPage';
import DescriptionPage from '../../UI/DescriptionPage';
import PricePage from '../../UI/PricePage'
import LocationPage from '../../UI/LocationPage'
import { callApi } from '../../../Helpers';
import { UserContext } from '../../Context'
import {Redirect} from 'react-router-dom'

class AddExtraPost extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      data: {
        parent_id: this.props.match.params.id,
        type: 1,
        categories: "['Extra Post']",
        content_manager: 1,
        state:1,
        title:'',
      },
    }
    this.setData = this.setData.bind(this)
    this.send = this.send.bind(this)
  }

  setData(data) {
    this.setState({ data: { ...this.state.data, ...data } })
  }

  async send() {
    let x = await callApi('extra_post', this.state.data, 'POST')
    // this.setState({redirect:true})
    if(this.state.data.title_fr){
      let translate_data = {post_id: x.id}
      translate_data.title=this.state.data.title_fr
      translate_data.description = this.state.data.description_fr || ''
      translate_data.lang_iso = 'fr'
      translate_data.summery = this.state.data.summery_fr || ''
      let translate = await callApi('extra_posts_translate', translate_data, 'POST')
    }
    window.location.href=new URLSearchParams(window.location.search).get('return')
  }

  render() {
    return <div>
      <FormNavigator data={this.state.data} send={this.send}>
        <UploadPage title='Image + Title' setData={this.setData} data={this.state.data} />
        <DescriptionPage title='Description' setData={this.setData} data={this.state.data} />
        <PricePage title='Price' setData={this.setData} data={this.state.data} />
        <LocationPage title='Location' setData={this.setData} data={this.state.data} />
      </FormNavigator>
    </div>;
  }
}
AddExtraPost.contextType = UserContext

export default AddExtraPost;
