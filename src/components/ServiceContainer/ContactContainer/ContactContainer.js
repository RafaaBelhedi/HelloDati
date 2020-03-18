import React, { Component } from 'react';
import './ContactContainer.scss';
import { UserContext } from '../../Context'
import { callApi } from '../../../Helpers';
class ContactContainer extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      hotelContactInfo: {},
      sucess_message: '',
      alert_message: [],

    }
    this.edit = this.edit.bind(this)
  }

  async componentDidMount() {
    let hotelContactInfo = await callApi('hotel/' + this.context.hotel_id[0])
    this.setState({ hotelContactInfo: hotelContactInfo.data[0] })
    console.log(this.state.hotelContactInfo)
    console.log(this.state.hotelContactInfo.adresse, "adressssse")
    console.log(this.state.hotelContactInfo.phone, "phone")
    console.log(this.state.hotelContactInfo.email, "email")
    console.log(this.state.hotelContactInfo.youtube, "youtube")

  }
  setData(hotelContactInfo) {
    this.setState({ hotelContactInfo: { ...this.state.hotelContactInfo, ...hotelContactInfo } })
  }

  async edit() {
    await this.setState({ alert_message: [] })
    if (!/[a-z]{1,10}/.test(this.state.hotelContactInfo.address)) {

      await this.setState({ alert_message: [...this.state.alert_message, "Invalid address Try again!"] })
    }
    if (!/^[0-9]*$/.test(this.state.hotelContactInfo.phone)) {

      await this.setState({ alert_message: [...this.state.alert_message, "Invalid phone!"] })
    }
    if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(this.state.hotelContactInfo.email)) {

      await this.setState({ alert_message: [...this.state.alert_message, "Invalid email!"] })
    }
    if (!/[a-z]{1,10}/.test(this.state.hotelContactInfo.facebook)) {

      await this.setState({ alert_message: [...this.state.alert_message, "Invalid facebook!"] })
    }
    if (!/[a-z]{1,10}/.test(this.state.hotelContactInfo.twitter)) {

      await this.setState({ alert_message: [...this.state.alert_message, "Invalid twitter!"] })
    }
    if (!/[a-z]{1,10}/.test(this.state.hotelContactInfo.youtube)) {

      await this.setState({ alert_message: [...this.state.alert_message, "Invalid youtube!"] })
    }
    if (this.state.alert_message.length == 0)
      if (this.state.hotelContactInfo.address)
        await callApi('hotel/' + this.context.hotel_id[0], { address: this.state.hotelContactInfo.address }, 'PUT')
    if (this.state.alert_message.length == 0)
      if (this.state.hotelContactInfo.phone)
        await callApi('hotel/' + this.context.hotel_id[0], { phone: this.state.hotelContactInfo.phone }, 'PUT')
    if (this.state.alert_message.length == 0)
      if (this.state.hotelContactInfo.email)
        await callApi('hotel/' + this.context.hotel_id[0], { email: this.state.hotelContactInfo.email }, 'PUT')
    if (this.state.alert_message.length == 0)
      if (this.state.hotelContactInfo.facebook)
        await callApi('hotel/' + this.context.hotel_id[0], { facebook: this.state.hotelContactInfo.facebook }, 'PUT')
    if (this.state.alert_message.length == 0)
      if (this.state.hotelContactInfo.twitter)
        await callApi('hotel/' + this.context.hotel_id[0], { twitter: this.state.hotelContactInfo.twitter }, 'PUT')
    if (this.state.alert_message.length == 0)
      if (this.state.hotelContactInfo.youtube)
        await callApi('hotel/' + this.context.hotel_id[0], { youtube: this.state.hotelContactInfo.youtube }, 'PUT')
    if (this.state.alert_message.length == 0)
      this.setState({ sucess_message: "success" })
    console.log(this.state.hotelContactInfo.email, "pfff")
  }
  render() {
    console.log(this.state.hotelContactInfo.email, "lemailhahaha")
    return <div className='contact-form-add'>

      <div className="contact-header">
        <img src="/img/services/edit-contact.svg" />
        <span>Edit contact</span>


      </div>

      <div className="message-succes">
        {this.state.sucess_message == "success" ? "Ajout avec succes !" : null}
      </div >
      <div className="message-erreur" >
        {this.state.alert_message.map(x => <p>{x}</p>)}
      </div>
      <div className="contact-inputs">
        <input placeholder="Siége social" defaultValue={this.state.hotelContactInfo.address} name="address" onChange={(e) => this.setData({ address: e.target.value })} />
        <input type="number" defaultValue={this.state.hotelContactInfo.phone} placeholder="Phone" name="phone" onChange={(e) => this.setData({ phone: e.target.value })} />
        <input type="email" placeholder="Email" defaultValue={this.state.hotelContactInfo.email} name="email" onChange={(e) => this.setData({ email: e.target.value })} />
        <input type="text" placeholder="Facebook" defaultValue={this.state.hotelContactInfo.facebook} name="facebook" onChange={(e) => this.setData({ facebook: e.target.value })} />
        <input type="text" placeholder="Twitter" defaultValue={this.state.hotelContactInfo.twitter} name="twitter" onChange={(e) => this.setData({ twitter: e.target.value })} />
        <input type="text" placeholder="Youtube" defaultValue={this.state.hotelContactInfo.youtube} name="youtube" onChange={(e) => this.setData({ youtube: e.target.value })} />
        <button onClick={this.edit}>
          <img src="/img/ui/valid.png" />
          validate
        </button>
      </div>

    </div>;
  }
}
ContactContainer.contextType = UserContext
export default ContactContainer;
