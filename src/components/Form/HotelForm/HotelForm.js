import React, { Component } from 'react';
import './HotelForm.scss'
import { callApi } from '../../../Helpers';
import { UserContext } from '../../Context';

import Modal from 'react-awesome-modal';
import ImageUploader from 'react-images-upload';
import { callApiWithBody } from '../../../Helpers';
import LogoUploader from './LogoUploader/LogoUploader'

class HotelForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      hotel: {},
      post: { ...this.props.post },
      alert_message: [],
      visible: '',
      image:"",
      cover:"",
    }
    this.send = this.send.bind(this)
    this.setData = this.setData.bind(this)
    this.setPost = this.setPost.bind(this)
    this.upload = this.upload.bind(this)
    this.uploadCover = this.uploadCover.bind(this)
  }
  async componentDidMount() {
    let hotel = await callApi('hotel/' + this.props.match.params.id).then(res=>{
console.log(res.data[0].id,"resdttuyt")
this.setState({ hotel: res.data[0] })
callApi("posts", {hotel_id: res.data[0].id,parent_id: null}).then(res=>{
  console.log(res.data[0].cover,"postres")
  document.querySelector('.fileContainer').style.backgroundImage = `url(${res.data[0].image})`
  document.querySelector('.coverUpload .fileContainer').style.backgroundImage = `url(${res.data[0].cover})`

   this.setData({ image: res.data[0].image , cover:res.data[0].cover })
})
    })
    console.log(this.state.hotel.id,"this.state.hotel.id")
    }

  async upload(e) {
    let post = new FormData()
    post.append('image', document.getElementsByName('image')[0].files[0])
    let image = await callApiWithBody('upload', post, 'POST')
    this.setData({ image: image.image })
    document.querySelector('.fileContainer').style.backgroundImage = `url(${image.image})`

  }
  async uploadCover(e) {
    let post = new FormData()
    post.append('image', document.getElementsByName('cover')[0].files[0])
    let image = await callApiWithBody('upload', post, 'POST')
    this.setData({ cover: image.image })
    document.querySelector('.coverUpload .fileContainer').style.backgroundImage = `url(${image.image})`


  }
  closeModal() {
    this.setState({
      visible: false
    });
  }
  setData(hotel) {
    this.setState({ hotel: { ...this.state.hotel, ...hotel } })
  }
  setPost(post) {
    this.setState({ post: { ...this.state.post, ...post } })
  }

  async send() {
    await this.setState({ alert_message: [] })
    if (!/[a-z]{1,10}/.test(this.state.hotel.hotel_name)) {

      this.setState({ alert_message: [...this.state.alert_message, "Invalid hotel name!"] })
    }
    if (!/[a-z]{1,10}/.test(this.state.hotel.city)) {

      this.setState({ alert_message: [...this.state.alert_message, "Invalid city!"] })
    }
    if (!/[a-z]{1,10}/.test(this.state.hotel.country)) {

      this.setState({ alert_message: [...this.state.alert_message, "Invalid country!"] })
    }
    if (!/[a-z]{1,10}/.test(this.state.hotel.region)) {

      this.setState({ alert_message: [...this.state.alert_message, "Invalidregion!"] })
    }
    if (!/[a-z]{1,10}/.test(this.state.hotel.continent)) {

      this.setState({ alert_message: [...this.state.alert_message, "Invalid continent!"] })
    }
    if (!/[a-z]{1,10}/.test(this.state.hotel.chain)) {

      this.setState({ alert_message: [...this.state.alert_message, "Invalid chain!"] })
    }

    if (!/^[1-5]$/.test(this.state.hotel.stars)) {

      this.setState({ alert_message: [...this.state.alert_message, "Invalid stars Number!"] })
    }
    if (!/[a-z]{1,10}/.test(this.state.hotel.address)) {

      this.setState({ alert_message: [...this.state.alert_message, "Invalid address!"] })
    }
    if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(this.state.hotel.email)) {

      this.setState({ alert_message: [...this.state.alert_message, "Invalid email !"] })
    }
    if (!/[a-z]{1,10}/.test(this.state.hotel.facebook)) {

      this.setState({ alert_message: [...this.state.alert_message, "Invalid facebook!"] })
    }
    if (!/[a-z]{1,10}/.test(this.state.hotel.twitter)) {

      this.setState({ alert_message: [...this.state.alert_message, "Invalid twitter!"] })
    }
    if (!/[a-z]{1,10}/.test(this.state.hotel.youtube)) {

      this.setState({ alert_message: [...this.state.alert_message, "Invalid youtube!"] })
    }
    if (!/[a-z]{1,10}/.test(this.state.hotel.trip_advisor_url)) {

      this.setState({ alert_message: [...this.state.alert_message, "Invalid trip_advisor_url!"] })
    }
    if (this.state.alert_message.length == 0)
        await callApi('hotel/' +  this.state.hotel.id,
         {hotel_name: this.state.hotel.hotel_name, city: this.state.hotel.city,country: this.state.hotel.country, region: this.state.hotel.region ,
          continent: this.state.hotel.continent,chain: this.state.hotel.chain, stars: this.state.hotel.stars,address: this.state.hotel.address ,
          email: this.state.hotel.email, facebook: this.state.hotel.facebook, twitter: this.state.hotel.twitter, youtube: this.state.hotel.youtube ,
          trip_advisor_url: this.state.hotel.trip_advisor_url,image:  this.state.hotel.image, cover:  this.state.hotel.cover }
         , 'PUT')



    if (this.state.alert_message.length == 0) {
      this.setState({ visible: "success" })
      setTimeout(()=>document.location.href="/hotels",1000)
    } else {
      this.setState({ visible: "echec" })
    }

    console.log(this.state.hotel, "hotel")

  }
  render() {

    return <div className='tourist-form-add'>

      <div className="tourist-header">
        <div >Edit Hotel</div>
      </div>
      <div className="message-erreur" >
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
            <div>successfully updated !</div>
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
      <div className="input-hotels">

        <div className="form-grouping-half-hotel-edit">
          <label className="input-label-half-hotel-edit"> Hotel name</label>
          <label className="input-label-half-hotel-edit">City</label>
          <label className="input-label-half-hotel-edit">Country</label>
          <input
            type="text"
            placeholder="hotel name"
            value={this.state.hotel.hotel_name || ''}
            onChange={(e) => this.setData({ hotel_name: e.target.value })}
            className="input-half-hotel-edit" />


          <input
            type="text"
            placeholder="city"
            value={this.state.hotel.city || ''}
            onChange={(e) => this.setData({ city: e.target.value })}
            className="input-half-hotel-edit" />

          <input
            type="text"
            placeholder="country"
            value={this.state.hotel.country || ''}
            onChange={(e) => this.setData({ country: e.target.value })}
            className="input-half-hotel-edit" />

        </div>
        <div className="form-grouping-half-hotel-edit">

          <label className="input-label-half-hotel-edit">Region </label>
          <label className="input-label-half-hotel-edit">continent</label>
          <label className="input-label-half-hotel-edit"> Chain</label>

          <input
            type="text"
            placeholder="region"
            value={this.state.hotel.region || ''}
            onChange={(e) => this.setData({ region: e.target.value })}
            className="input-half-hotel-edit" />


          <input
            type="text"
            placeholder="continent"
            value={this.state.hotel.continent || ''}
            onChange={(e) => this.setData({ continent: e.target.value })}
            className="input-half-hotel-edit" />
          <input
            type="text"
            placeholder="chain"
            value={this.state.hotel.chain || ''}
            onChange={(e) => this.setData({ chain: e.target.value })}
            className="input-half-hotel-edit" />
        </div>

        <div className="form-grouping-half-hotel-edit">

          <label className="input-label-half-hotel-edit">stars</label>
          <label className="input-label-half-hotel-edit"> Address</label>
          <label className="input-label-half-hotel-edit">Email</label>


          <input
            type="text"
            placeholder="stars"
            value={this.state.hotel.stars || ''}
            onChange={(e) => this.setData({ stars: e.target.value })}
            className="input-half-hotel-edit" />

          <input
            type="text"
            placeholder="address"
            value={this.state.hotel.address || ''}
            onChange={(e) => this.setData({ address: e.target.value })}
            className="input-half-hotel-edit" />


          <input
            type="text"
            placeholder="email"
            value={this.state.hotel.email || ''}
            onChange={(e) => this.setData({ email: e.target.value })}
            className="input-half-hotel-edit" />

        </div>
        <div className="form-grouping-half-hotel-edit">




          <label className="input-label-half-hotel-edit"> facebook </label>
          <label className="input-label-half-hotel-edit"> Twitter</label>
          <label className="input-label-half-hotel-edit">Youtube</label>

          <input
            type="text"
            placeholder="facebook"
            value={this.state.hotel.facebook || ''}
            onChange={(e) => this.setData({ facebook: e.target.value })}
            className="input-half-hotel-edit" />

          <input
            type="text"
            placeholder="youtube"
            value={this.state.hotel.twitter || ''}
            onChange={(e) => this.setData({ twitter: e.target.value })}
            className="input-half-hotel-edit" />


          <input
            type="text"
            placeholder="trip_advisor_url"
            value={this.state.hotel.youtube || ''}
            onChange={(e) => this.setData({ youtube: e.target.value })}
            className="input-half-hotel-edit" />

        </div>

        <div className="form-one-item-hotel-edit">
          <label className="input-label-half-hotel-edit"> Trip Advisor Url</label>
          <label className="input-label-half-hotel-edit">Image</label>
          <label className="input-label-half-hotel-edit">Cover</label>

          <input
            type="text"
            placeholder="trip_advisor_url"
            value={this.state.hotel.trip_advisor_url || ''}
            onChange={(e) => this.setData({ trip_advisor_url: e.target.value })}
            className="input-half-hotel-edit" />
             <ImageUploader
            onChange={this.upload}
            // label={'Max file size: 2MB | Allowed formats: jpg, png'}
            maxFileSize="2097152"
            name="image"
            className="imageUpload"
          />
            <ImageUploader
            onChange={this.uploadCover}
            // label={'Max file size: 2MB | Allowed formats:  jpg, png'}
            maxFileSize="2097152"
            name="cover"
            className="coverUpload"
          />
        </div>
     
        <button onClick={this.send}>
          <img src="/img/ui/valid.png" />
          Confirm
        </button>
      </div>
    </div>;
  }
}

HotelForm.contextType = UserContext

export default HotelForm;
