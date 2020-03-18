import React, { Component } from 'react';
import './AddHotelForm.scss'
import { callApi, callApiWithBody } from '../../../Helpers';
import { UserContext } from '../../Context'
import Modal from 'react-awesome-modal';
import ImageUploader from 'react-images-upload';

class AddHotelForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      hotel: {
        image: "",
        cover: ""
      },
      alert_message: [],
      visible: '',


    }
    this.setData = this.setData.bind(this)
    this.send = this.send.bind(this)
    this.upload = this.upload.bind(this)
    this.uploadCover = this.uploadCover.bind(this)


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

    if (this.state.alert_message.length == 0) {
      await callApi('hotel', this.state.hotel, 'POST')
        .then(res => {
          console.log(res, "resss")
          this.setState({ visible: "success" })
          setTimeout(() => document.location.href = "/hotels", 1000)
        }).catch(error => { this.setState({ visible: "echec" }) })
    }



  }

  setData(hotel) {
    this.setState({ hotel: { ...this.state.hotel, ...hotel } });
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
  render() {
    console.log(this.state.image, "imagepost")
    return <div className='hotel-form-add'>

      <div className="hotel-header">
        <div><img src="/img/ui/add_room.png" /></div>
        <div>Add Hotel</div>
      </div>
      <div className="message-succes">
        {this.state.sucess_message == "success" ? "Ajout avec succes !" : null}
      </div >
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
            <div>successfully added !</div>
            <button onClick={() => this.closeModal()} >X</button>
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
      <div className="hotel-inputs">
        <input
          type="text"
          required
          placeholder="hotel name"
          value={this.state.hotel.hotel_name || ''}
          onChange={(e) => this.setData({ hotel_name: e.target.value })}
          className="input-half-hotel-add" />


        <input
          type="text"
          required
          placeholder="city"
          value={this.state.hotel.city || ''}
          onChange={(e) => this.setData({ city: e.target.value })}
          className="input-half-hotel-add" />

        <input
          type="text"
          required
          placeholder="country"
          value={this.state.hotel.country || ''}
          onChange={(e) => this.setData({ country: e.target.value })}
          className="input-half-hotel-add" />

        <input
          type="text"
          required
          placeholder="region"
          value={this.state.hotel.region || ''}
          onChange={(e) => this.setData({ region: e.target.value })}
          className="input-half-hotel-add" />
        <input
          type="text"
          required
          placeholder="continent"
          value={this.state.hotel.continent || ''}
          onChange={(e) => this.setData({ continent: e.target.value })}
          className="input-half-hotel-add" />


        <input
          type="text"
          required
          placeholder="chain"
          value={this.state.hotel.chain || ''}
          onChange={(e) => this.setData({ chain: e.target.value })}
          className="input-half-hotel-add" />

        <input
          type="number"
          required
          placeholder="stars"
          value={this.state.hotel.stars || ''}
          onChange={(e) => this.setData({ stars: e.target.value })}
          className="input-half-hotel-add" />

        <input
          type="text"
          required
          placeholder="address"
          value={this.state.hotel.address || ''}
          onChange={(e) => this.setData({ address: e.target.value })}
          className="input-half-hotel-add" />
        <input
          type="email"
          required
          placeholder="email"
          value={this.state.hotel.email || ''}
          onChange={(e) => this.setData({ email: e.target.value })}
          className="input-half-hotel-add" />


        <input
          type="text"
          required
          placeholder="facebook"
          value={this.state.hotel.facebook || ''}
          onChange={(e) => this.setData({ facebook: e.target.value })}
          className="input-half-hotel-add" />

        <input
          type="text"
          required
          placeholder="twitter"
          value={this.state.hotel.twitter || ''}
          onChange={(e) => this.setData({ twitter: e.target.value })}
          className="input-half-hotel-add" />

        <input
          type="text"
          required
          placeholder="youtube"
          value={this.state.hotel.youtube || ''}
          onChange={(e) => this.setData({ youtube: e.target.value })}
          className="input-half-hotel-add" />

        <input
          type="text"
          required
          placeholder="trip_advisor_url"
          value={this.state.hotel.trip_advisor_url || ''}
          onChange={(e) => this.setData({ trip_advisor_url: e.target.value })}
          className="input-half-hotel-add" />
        {/* <input
          type="number"
          required
          placeholder="check In"
          value={this.state.hotel.check_in || ''}
          onChange={(e) => this.setData({ check_in: e.target.value })}
          className="input-half-hotel-add" /> */}

        {/* <input
          type="number"
          required
          placeholder="check Out"
          value={this.state.hotel.check_out || ''}
          onChange={(e) => this.setData({ check_out: e.target.value })}
          className="input-half-hotel-add" /> */}



        <ImageUploader
          onChange={this.upload}
          // label={'Max file size: 2MB | Allowed formats:  jpg, png'}
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

      <button onClick={this.send} className="buttonAddHotels">
        <img src="/img/ui/valid.png" />
          Add
          </button>


    </div>;

  }
}

AddHotelForm.contextType = UserContext

export default AddHotelForm;
