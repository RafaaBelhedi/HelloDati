import React, { Component } from 'react';
import './DishInformation.scss'
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

class DishInformation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return <div>
      <img src="/img/ui/info_bulle.png" onClick={this.openModal} />
      <Modal className="dish_modal"
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName="Overlay"
      >
        <div className="dish_information">
          <img src={this.props.image} className="image" />
          <div className="text_description">
            <h2>{this.props.title}</h2>
            <p>{this.props.description}</p>
            <div className="price">
              {typeof this.props.price !== 'undefined' && <sub>{this.props.price} </sub>}
              <span>dt</span>
            </div>
          </div>

        </div>
        <span className="close_button" onClick={this.closeModal}>&times;</span>
      </Modal>


    </div>;
  }
}

export default DishInformation;

