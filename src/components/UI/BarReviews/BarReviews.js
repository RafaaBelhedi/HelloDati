import React, { Component } from 'react';
import './BarReviews.scss';
import Modal from 'react-modal';
import ReviewCard from '../ReviewCard';
import { callApi } from '../../../Helpers';

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

class BarReviews extends Component {
  constructor(props) {
    super(props)
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
      reviews = await callApi('/post_reviews', { post_id: this.props.id }, 'GET');
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
      <span className="Bar_review" onClick={this.openModal}><img src="/img/ui/review_logo.png" className="Bar_review_logo" /><p>Reviews</p></span>

      <Modal className="bar_modal"
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        overlayClassName="Overlay"
      >
        <span className="bar_close_button" onClick={this.closeModal}>&times;</span>
        <div className="header"><p className="title">Reviews</p>
          <span>{this.state.reviews.length} Reviews</span></div>
        <div className="reviews_container">
          {this.state.reviews.map(review => <ReviewCard guestName={review.tourist_name} guestImage={review.tourist_image} comment={review.comment} writed_at={review.date} rating={review.rating} country={review.tourist_country} />)}
        </div>
      </Modal>


    </div>;
  }
}

export default BarReviews;

