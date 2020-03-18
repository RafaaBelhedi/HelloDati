import React, { Component } from 'react';
import { callApi, callApiWithBody } from '../../../Helpers';
import { UserContext } from '../../Context'
import './EditDishOrDrinkForm.scss';
import Modal from 'react-awesome-modal';
import DishUpdateFormNew from '../DishUpdateForm/DishUpdateFormNew';

class EditDishOrDrinkForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      redirection: false,
      id: this.props.match.params.id,
      data: {
        id: this.id,
        opening_time: {
          "Mon": [["1", "08:00", "10:00"], ["1", "10:00", "11:11"]],
          "Tue": [["1", "09:00", "10:00"], ["1", "14:00", "18:00"]],
          "Wed": [["0"], ["0"]],
          "Thu": [["0"], ["0"]],
          "Fri": [["0"], ["0"]],
          "Sat": [["0"], ["0"]],
          "Sun": [["0"], ["0"]],
        },
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
        fr: false,
        arPostTranslateID: null,
        frPostTranslateID: null
      },
    }
    this.setData = this.setData.bind(this);
    this.send = this.send.bind(this);
    this.upload = this.upload.bind(this);
    this.setLangPost = this.setLangPost.bind(this);
  }
  async componentDidMount() {
    await callApi('post/' + this.state.id).then(res => {
      this.setState({ data: res.data[0] });
      callApi('posts_translates', { post_id: res.data[0].id, lang_iso: "fr" }).then(async res => {

        if (res.data.length > 0) {
          await this.setState({
            tradLang: {
              ...this.state.tradLang,
              title_fr: res.data[0].title,
              description_fr: res.data[0].description,
              fr: true,
              lang_fr: false,
              frPostTranslateID: res.data[0].id
            }
          });
        }

      });
      callApi('posts_translates', { post_id: res.data[0].id, lang_iso: "ar" }).then(async res => {
        if (res.data.length > 0) {
          await this.setState({
            tradLang: {
              ...this.state.tradLang,
              title_ar: res.data[0].title,
              description_ar: res.data[0].description,
              ar: true,
              lang_ar: false,
              arPostTranslateID: res.data[0].id
            }
          });
        }

      })
    });
  }
  isRestaurant() {
    if (typeof this.props.isRestaurant == 'undefined') {
      return
    }
  }
  setData(data) {
    this.setState({ data: { ...this.state.data, ...data } })

  }
  setLangPost(tradLang) {
    this.setState({ tradLang: { ...this.state.tradLang, ...tradLang } });
  }


  async send() {
    await callApi('post/' + this.state.id, this.state.data, 'PUT').then(res => {
      if (this.state.tradLang.fr == true) {
        let frenchData =
        {
          hotel_id: this.context.hotel_id[0],
          post_id: res.data[0].id,
          title: this.state.tradLang.title_fr,
          description: this.state.tradLang.description_fr,
          lang_iso: 'fr'
        }
        if (this.state.tradLang.frPostTranslateID == null)
          callApi('posts_translate', frenchData, 'POST');
        callApi('/posts_translate/' + this.state.tradLang.frPostTranslateID, frenchData, 'PUT');
      }
      else {
        if (this.state.tradLang.frPostTranslateID != null) {
          callApi('/posts_translate/' + this.state.tradLang.frPostTranslateID, {}, 'DELETE').then(res => { console.log('res', res) });
        }

      }
      if (this.state.tradLang.ar == true) {
        let arabianData =
        {
          hotel_id: this.context.hotel_id[0],
          post_id: res.data[0].id,
          title: this.state.tradLang.title_ar,
          description: this.state.tradLang.description_ar,
          lang_iso: 'ar'
        }
        if (this.state.tradLang.arPostTranslateID == null)
          callApi('posts_translate', arabianData, 'POST');
        callApi('/posts_translate/' + this.state.tradLang.arPostTranslateID, arabianData, 'PUT');
      } else {
        if (this.state.tradLang.arPostTranslateID != null)
          callApi('/posts_translate/' + this.state.tradLang.arPostTranslateID, {}, 'DELETE').then(res => { console.log('res', res) });
      }

      this.setState({ visible: "success" });
    }).then(() => {
      this.props.history.push('/category/' + this.state.data.parent_id);
    }).catch(error => { this.setState({ visible: "echec" }) });
  }
  ellipsis(promo) {
    promo = String(promo);
    return promo.substring(0, 3);
  }
  closeModal = () => {
    this.setState({
      visible: false
    });
  }
  async upload(e) {
    let data = new FormData()
    data.append('image', document.getElementsByName('image')[0].files[0])
    let image = await callApiWithBody('upload', data, 'POST')
    this.setState({ image: image.image })
    this.setData({ image: image.image, imagePreviewUrl: image.image })
    document.querySelector('.fileContainer').style.backgroundImage = `url(${image.image})`
  }
  render() {
    return <div>
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
            <div>Successfully Updated !</div>
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
      <div className="drink-form-container">
        <div className="drink-left-preview">
          {/* <div className="drink-arrow-right" style={{ display: !this.state.data.image ? 'none' : '' }}></div> */}
          <img src="/img/ui/c15pro.png" alt="phone_photo" className="drink-c15-phone" />
          <div className="drink-preview-box" style={{ borderLeft: '4px solid' + this.props.themeColor }}>
            <p style={{ color: this.props.themeColor }}>{this.state.data.title}</p>
            <img src={this.state.data.image ? this.state.data.image : "/img/ui/no-photo.png"} style={{ borderLeft: !this.state.data.image ? '1px dashed gray' : '' }} alt="Preview Template" />
            <p className="drink-price">{this.state.data.price}<sup style={{ display: this.state.data.price ? 'inline' : 'none' }}>Dt</sup></p>
            <span className="drink-promo" style={{ display: this.state.data.price_promo ? 'inline' : 'none' }}>
              {this.state.data.price_promo && this.state.data.price_promo.length > 3 ? this.ellipsis(this.state.data.price_promo) + '...' : this.state.data.price_promo}%</span>
          </div>
        </div>
        <DishUpdateFormNew data={this.state.data} tradLang={this.state.tradLang} setLangPost={this.setLangPost} setData={this.setData} send={this.send} upload={this.upload} isDish={this.props.isDish} hasPromo={this.props.hasPromo} postID={this.state.id} />

      </div>

    </div>
  }
}

EditDishOrDrinkForm.contextType = UserContext

export default EditDishOrDrinkForm;