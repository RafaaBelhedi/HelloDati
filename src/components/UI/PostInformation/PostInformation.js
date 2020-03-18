import React, { Component } from 'react';
import './PostInformation.scss';
import Modal from 'react-modal';
import ReviewCard from '../ReviewCard';
import { callApi } from '../../../Helpers';
import { UserContext } from '../../Context';

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

class PostInformation extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      modalIsOpen: false,
      reviews: []
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidUpdate(previousProps, previousState) {
    let reviews;
    if (this.state.modalIsOpen === true) {
      reviews = await callApi('/post_reviews', { post_id: this.props.id, hotel_id: this.context.hotel_id[0] }, 'GET');
      this.setState({ reviews: reviews.data });
    }
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return <div>
      {this.props.isBar === true ? <span className="Bar_review" onClick={this.openModal}><img src="/img/ui/review_logo.png" className="Bar_review_logo" /> <p>Reviews</p></span> : <img src="/img/ui/info_bulle.png" onClick={this.openModal} />}

      <Modal className="modal"
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName="Overlay"
      >
        <div className="post_information">
          <img src={this.props.image} />
          <div className="text_description">
            <h2>{this.props.title}</h2>
            <p>{this.props.description}</p>
          </div>
        </div>
        <span className="close_button" onClick={this.closeModal}>&times;</span>
        <hr />

        <p>Reviews <span>Reviews {this.state.reviews.length}</span></p>
        <div className="reviews_container">
          {this.state.reviews.map(review => <ReviewCard guestName={review.tourist_name} guestImage={review.tourist_image} comment={review.comment} writed_at={review.date} rating={review.rating} country={review.tourist_country} />)}
        </div>
      </Modal>


    </div>;
  }
}
PostInformation.contextType = UserContext
export default PostInformation;

