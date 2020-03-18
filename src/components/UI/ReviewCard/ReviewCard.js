import React, { Component } from 'react';
import './ReviewCard.scss';
import Flag from 'react-country-flags';
import StarRatings from 'react-star-ratings';


class ReviewCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: []
    }
  }

  render() {
    return <div className="review_card">
      <img src={this.props.guestImage} className="logo" alt="logo" />
      <div className="text_container">
        <div className="review_header">
          <h4>{this.props.guestName}</h4>
          <div className="flag"><Flag country={this.props.country.toLowerCase()} /></div>
        </div>

        <p className="writed_at">Writed at {this.props.writed_at}</p>
        <div className="stars"><StarRatings
          rating={this.props.rating}
          starRatedColor="#f6a800"
          numberOfStars={5}
          name='rating'
          starDimension="14px"
          starSpacing="1px"
        />
        </div>
        <p className="comment">{this.props.comment}</p>
      </div>

    </div>;
  }
}

export default ReviewCard;

