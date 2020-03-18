import React, { Component } from 'react';
import './Details.scss';
import Modal from 'react-modal';
import { countries } from 'country-data';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
class DetailsGuest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      reviews: []
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderGender = this.renderGender.bind(this);

  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  renderGender(gender) {
    switch (gender) {
      case 0:
        return "Other"
      case 1:
        return " Male "
      case 2:
        return "Female"

    }
  }
  render() {
    return <div className="Details_container">
      <img src="img/ui/popup-icon.svg" onClick={this.openModal}></img>
      <Modal className="modal_details"
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName="Overlay"
      >
        <div id="header">
          <div id="cross_button" onClick={this.closeModal}>&times;</div>
          <p className="title">{this.props.detail.first_name + ' ' + this.props.detail.last_name}</p>
        </div>
        <hr />

        <div id="popup-container">
          <div className="first-column">
            <p>Gender : <span>{this.renderGender(this.props.detail.gender)}</span></p>
            <p>Born : <span>{this.props.detail.born}</span></p>
            <p>Room : <span>{this.props.detail.stay.device_room.room.room_number != undefined ? this.props.detail.stay.device_room.room.room_number : 'Not affected'}</span></p>
            <p>CIN / Passport : <span>{this.props.detail.cin_number}</span></p>
          </div>
          <div className="second-column">
            <p>Check in : <span>{this.props.detail.check_in}</span></p>
            <p>Check out : <span>{this.props.detail.check_out}</span></p>
            <p>Email : <span>{this.props.detail.email}</span></p>
            <p>Phone number : <span>{this.props.detail.phone_number}</span></p>
          </div>
          <div className="third-column">
            <p>Country : <span>{countries[this.props.detail.country].name}</span></p>
            <p>City : <span>{this.props.detail.city}</span></p>
            <p>Zip Code : <span>{this.props.detail.zip_code}</span></p>
            <p>Adress : <span>{this.props.detail.address_1}</span></p>
          </div>
        </div>
      </Modal>
    </div>;
  }
}

export default DetailsGuest;

