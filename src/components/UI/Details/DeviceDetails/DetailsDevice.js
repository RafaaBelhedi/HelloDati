import React, { Component } from 'react';
import './DeviceDetails.scss';
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

class DetailsDevice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      reviews: []
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderStatus = this.renderStatus.bind(this)
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  renderStatus(status) {
    switch (status) {
      case 0:
        return "Inactive"
      case 1:
        return "Active"

    }
  }

  render() {
    return <div className="device_details_container">
      <button className="details_button" onClick={this.openModal}><p>Details</p></button>
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
          <p className="title">Device details</p>
        </div>

        <hr />

        <div id="device_popup-container">
          <div className="first-column">
            <p>Hotel name : <span>{this.props.detail.hotel.hotel_name}</span></p>
            <p>Guest name : <span>{this.props.detail.device_room.stay.tourist.id != undefined ? this.props.detail.device_room.stay.tourist.name : 'Not affected'}</span></p>
            <p>IMEI : <span>{this.props.detail.imei}</span></p>
            <p>Room number : <span>{this.props.detail.device_room.room.room_number != undefined ? this.props.detail.device_room.room.room_number : 'Not affected'}</span></p>
          </div>
          <div className="second-column">
            <p>Call limit : <span>{this.props.detail.call_limit}</span></p>
            <p>Call time : <span>{this.props.detail.call_time}</span></p>
            <p>Sim number : <span>{this.props.detail.number}</span></p>
            <p>Phone type : <span>{this.props.detail.phone}</span></p>
          </div>
        </div>
      </Modal>
    </div>;
  }
}

export default DetailsDevice;

