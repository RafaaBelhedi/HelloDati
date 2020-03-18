import React, { Component } from 'react';
import '../DeviceDetails/DeviceDetails.scss';
import Modal from 'react-modal';


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

class DetailsRoom extends Component {
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
    return <div className="device_details_container">
      <div className="room_details_button" onClick={this.openModal}><p>Details</p></div>

      <Modal className="device_details"
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName="Overlay"
      >
        <div id="header">
          <div id="cross_button" onClick={this.closeModal}>&times;</div>
          <p className="title">Room details</p>
        </div>

        <hr />
        <div id="device_popup-container">
          <div className="first-column">
            <p>Hotel name : <span>{this.props.detail.hotel.hotel_name}</span></p>
            <p>Linked to guest : <span>{this.props.detail.tourist_name != " " ? this.props.detail.tourist_name : 'Not affected'}</span></p>
            <p>Linked to device  : <span>{this.props.detail.device_imei}</span></p>
          </div>
          <div className="second-column">
            <p>Section : <span>{this.props.detail.section}</span></p>
            <p>Floor : <span>{this.props.detail.floor}</span></p>
            <p>Capacity : <span>{this.props.detail.capacity}</span></p>
          </div>
        </div>
      </Modal>


    </div >;
  }
}

export default DetailsRoom;

