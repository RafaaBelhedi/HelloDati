import "./ExtraPostCard.scss"
import React, { Component } from 'react';
import ReactSVG from 'react-svg'
import './ExtraPostCard.scss'
import { Redirect } from 'react-router-dom'
import Switch from '../Switch';
import EditButton from '../EditButton'

class ExtraPostCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
    }
  }

  render() {
    if (this.state.redirect)
      return <Redirect to={'/extra/' + this.props.post.id}></Redirect>
    return <div className="dish-card">
      <div onClick={() => window.location.href = "/extra/" + this.props.post.id} className="description">
        {/* <ReactSVG
          src="/img/restaurant/dish.svg"
        /> */}
        <p className="titless">
          {this.props.post.title}
        </p>
        <p className="desc">
          {this.props.post.description || 'No Description'}
        </p>
        {
          this.props.post.price ?
            (<p className="price">
              {this.props.post.price_promo ? (this.props.post.price - this.props.post.price * this.props.post.price_promo / 100).toFixed(1) : this.props.post.price.toFixed(1)}<sup> dt </sup>{this.props.post.price_promo ? '(' + this.props.post.price_promo + '%)' : ''}
            </p>) : ''
        }

      </div>
      <div style={{ backgroundImage: `url(${this.props.post.image})` }} className="image">
        <Switch extra={true} id={this.props.post.id} check={this.props.post.state == 1}></Switch>
        <EditButton link={this.props.link} id={this.props.post.id}>Edit</EditButton>
      </div>
    </div>;
  }
}

export default ExtraPostCard;
