import React, { Component } from 'react';
import { callApi, callApiWithBody } from '../../../Helpers';
import { UserContext } from '../../Context'
import './AddDishOrDrinkForm.scss';
import Modal from 'react-awesome-modal';
import RestaurantFormNew from '../RestaurantForm/RestaurantFormNew'

class AddDishOrDrinkForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      data: {
        ordered_or_reserved: 1,
        hotel_id: this.context.hotel_id[0],
        parent_id: this.props.match.params.id,
        type: 1,
        categories: "['Dish']",
        content_manager: 1,
        state: 1,
      },
      tradLang: {
        hotel_id: this.context.hotel_id[0],
        lang_fr: true,
        lang_ar: false,
        title_fr: '',
        description_fr: '',
        title_ar: '',
        description_ar: '',
        ar: false,
        fr: false
      },
      alert_message: [],
    }
    this.setData = this.setData.bind(this)
    this.send = this.send.bind(this)
    this.upload = this.upload.bind(this)
    this.setLangPost = this.setLangPost.bind(this)
  }

  setData(data) {
    this.setState({ data: { ...this.state.data, ...data } })
  }

  ellipsis(promo) {
    promo = String(promo);
    return promo.substring(0, 3);
  }
  setLangPost(tradLang) {
    this.setState({ tradLang: { ...this.state.tradLang, ...tradLang } })
  }
  componentDidUpdate(nextProps, prevState) {
    if (this.state.tradLang.lang !== prevState.tradLang.lang) {
      this.setLangPost(this.state.tradLang.lang);
    }
  }

  async send() {
    await this.setState({ alert_message: [] })

    if (document.forms["formAddRestau"]["title"].value) {
      if (!/[a-z]{1,10}/.test(this.state.data.title)) {

        this.setState({ alert_message: [...this.state.alert_message, "Invalid title !"] })
      }
    } else if (document.forms["formAddRestau"]["title"].value == "") {
      await this.setState({ alert_message: [...this.state.alert_message, "Missing title!"] })
    }



    // if (!/[a-z]{1,10}/.test(this.state.data.title)) {

    //   this.setState({ alert_message: [...this.state.alert_message, "Invalid title!"] })
    // }
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
        this.props.history.push('/category/' + this.state.data.parent_id)
      }).catch(error => { this.setState({ visible: "echec" }) })

    }

    if (this.state.alert_message.length == 0) {
      this.setState({ visible: "success" })
      // setTimeout(() => document.location.href = "/rooms", 1000);
    } else {
      this.setState({ visible: "echec" })
    }
  }
  async upload(e) {
    let data = new FormData()
    data.append('image', document.getElementsByName('image')[0].files[0])
    let image = await callApiWithBody('upload', data, 'POST')
    this.setState({ image: image.image })
    this.setData({ image: image.image, imagePreviewUrl: image.image })
  }

  closeModal = () => {
    this.setState({
      visible: false
    });
  }

  render() {
    return <div>

      <div className="message-erreur" style={{ marginLeft: "31%" }}>
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
            <div>successfully added !</div>
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
      <div className="service-form-container">
        <div className="left-preview">
          <img src="/img/ui/c15pro.png" alt="phone_photo" className="c15-phone" />
          <div className="service-preview-box" style={{ borderLeft: '4px solid' + this.props.themeColor }}>
            <p style={{ color: this.props.themeColor }}>{this.state.data.title}</p>
            <img src={this.state.data.imagePreviewUrl ? this.state.data.imagePreviewUrl : "/img/ui/no-photo.png"} style={{ borderLeft: !this.state.data.imagePreviewUrl ? '1px dashed gray' : '' }} alt="Preview Template" />
            <p className="price">{this.state.data.price}<sup style={{ display: this.state.data.price ? 'inline' : 'none' }}>Dt</sup></p>
            <span className="promo" style={{ display: this.state.data.price_promo ? 'inline' : 'none' }}>
              {this.state.data.price_promo && this.state.data.price_promo.length > 3 ? this.ellipsis(this.state.data.price_promo) + '...' : this.state.data.price_promo}%</span>
          </div>
        </div>
        <RestaurantFormNew className="form-navigator" data={this.state.data} setData={this.setData} send={this.send} upload={this.upload} tradLang={this.state.tradLang} setLangPost={this.setLangPost} hasPromo={this.props.hasPromo} hasOpenTime={this.props.hasOpenTime} />

      </div>
    </div>;
  }
}
AddDishOrDrinkForm.contextType = UserContext

export default AddDishOrDrinkForm;
