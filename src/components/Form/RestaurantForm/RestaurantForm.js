import React, { Component } from 'react';
import { callApi, callApiWithBody } from '../../../Helpers';
import { UserContext } from '../../Context'
import './RestaurantForm.scss'
import Modal from 'react-awesome-modal';
import RestaurantFormNew from './RestaurantFormNew';
class RestaurantForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      data: {
        ordered_or_reserved: 2,
        hotel_id: this.context.hotel_id[0],
        parent_id: this.props.match.params.id,
        type: 1,
        categories: "['Dish']",
        content_manager: 1,
        state: 1,
        opening_time: {
          "Mon": [["0"], ["0"]],
          "Tue": [["0"], ["0"]],
          "Wed": [["0"], ["0"]],
          "Thu": [["0"], ["0"]],
          "Fri": [["0"], ["0"]],
          "Sat": [["0"], ["0"]],
          "Sun": [["0"], ["0"]],
        },

        has_opening_time: 0,
      },

      alert_message: [],
      sucess_message: '',
      tradLang: {
        hotel_id: this.context.hotel_id[0],
        lang_fr: true,
        lang_ar: false,
        title_fr: '',
        description_fr: '',
        title_ar: '',
        description_ar: '',
        ar: false,
        fr: false,
      },
    }
    this.setData = this.setData.bind(this)
    this.send = this.send.bind(this)
    this.upload = this.upload.bind(this)
    this.setLangPost = this.setLangPost.bind(this);
  }
  setData(data) {
    this.setState({ data: { ...this.state.data, ...data } })
  }
  setLangPost(tradLang) {
    this.setState({ tradLang: { ...this.state.tradLang, ...tradLang } })
  }
  componentDidUpdate(nextProps, prevState) {
    if (this.state.tradLang.lang !== prevState.tradLang.lang) {
      this.setLangPost(this.state.tradLang.lang);
    }
  }
  callbackFunction(childData) { this.state({ message: childData }) }
  async send() {
    await this.setState({ alert_message: [] })
    if (document.forms["formAddRestau"]["title"].value) {
      if (!/[a-z]{1,10}/.test(this.state.data.title)) {

        this.setState({ alert_message: [...this.state.alert_message, "Invalid title !"] })
      }
    } else if (document.forms["formAddRestau"]["title"].value == "") {
      await this.setState({ alert_message: [...this.state.alert_message, "Missing title!"] })
    }


    if (! /[\/.](gif|jpg|jpeg|tiff|png)$/i.test(this.state.data.image)) {

      this.setState({ alert_message: [...this.state.alert_message, "Please enter a image!"] })
    }
    if (!/[a-z]{1,10}/.test(this.state.data.description)) {

      this.setState({ alert_message: [...this.state.alert_message, "Invalid description!"] })
    }
    if (!/[a-z]{1,10}/.test(this.state.data.summery)) {

      this.setState({ alert_message: [...this.state.alert_message, "Invalid summery!"] })
    }
    if (this.state.alert_message.length == 0) {
      await callApi('post', this.state.data, 'POST').then(res => {
        if (this.state.tradLang.fr == true) {
          let translate_data =
          {
            hotel_id: this.context.hotel_id[0],
            post_id: res.data[0].id,
            title: this.state.tradLang.title_fr,
            description: this.state.tradLang.description_fr,
            lang_iso: 'fr'

          }

          callApi('posts_translate', translate_data, 'POST');
        }
        if (this.state.tradLang.ar == true) {
          let translate_data =
          {
            hotel_id: this.context.hotel_id[0],
            post_id: res.data[0].id,
            title: this.state.tradLang.title_ar,
            description: this.state.tradLang.description_ar,
            lang_iso: 'ar'
          }
          callApi('posts_translate', translate_data, 'POST');
        }

        this.setState({ visible: "success" })
      }).then(() => {
        this.props.history.push('/service/' + this.state.data.parent_id)
      }).catch(error => { this.setState({ visible: "echec" }) });
    }

    if (this.state.alert_message.length == 0) {
      this.setState({ visible: "success" })
      //  this.props.history.push()
    } else {
      this.setState({ visible: "echec" })
    }
  }
  async upload(e) {
    let data = new FormData()
    data.append('image', document.getElementsByName('image')[0].files[0])
    let image = await callApiWithBody('upload', data, 'POST')
    this.setState({ image: image.image })
    this.setData({ image: image.image, imagePreviewUrl: image.image });
  }
  closeModal = () => {
    this.setState({
      visible: false
    });
  }
  render() {
    return <div>
      <div className="message-erreur" style={{ marginLeft: "31%" }} >
        {this.state.alert_message.map(x => <p>{x}</p>)}
      </div>
      {this.state.visible == "success" ?
        <Modal
          className="my-modal"
          visible={this.state.visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div className="valide-modal">
            <img src="/img/ui/succes.png" style={{ width: "32", height: "32" }} />
            <div>Successfully added !</div>
            {/* <button onClick={() => this.closeModal()} >X</button> */}
          </div>
        </Modal>
        : null}
      {this.state.visible == "echec" ?
        <Modal
          className="my-modal"
          visible={this.state.visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div className="echec-modal">
            <img src="/img/ui/echec.png" style={{ width: "32", height: "32" }} />
            <div>Reinsert information please !</div>
            <button onClick={() => this.closeModal()} >X</button>
          </div>
        </Modal>
        : null}


      <div className="restaurant-form-container-main">
        <div className="left-preview">
          <img src="/img/ui/c15pro.png" alt="phone_photo" className="restaurant-c15-phone-one" />
          <div className="restaurant-preview-box-one">
            <p style={{ color: this.props.themeColor }}>{this.state.data.title}</p>
            <span>{this.state.data.location}</span>

            <img src={this.state.data.imagePreviewUrl ? this.state.data.imagePreviewUrl : "/img/ui/no-photo.png"} style={{ borderLeft: !this.state.data.imagePreviewUrl ? '1px dashed gray' : '' }} alt="Preview Template" />
          </div>
        </div>

        <RestaurantFormNew className="form-navigator" data={this.state.data} setData={this.setData} send={this.send} upload={this.upload} tradLang={this.state.tradLang} setLangPost={this.setLangPost} hasPromo={this.props.hasPromo} hasOpenTime={this.props.hasOpenTime} alert_message={this.state.alert_message} />

      </div>

    </div>;
  }
}
RestaurantForm.contextType = UserContext

export default RestaurantForm;
