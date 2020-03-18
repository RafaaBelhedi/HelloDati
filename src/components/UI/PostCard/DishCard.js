import "./DishCard.scss"
import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import { Redirect } from 'react-router-dom'
import Switch from '../Switch';
import EditButton from '../EditButton'
import PostInformation from "../PostInformation";
import DishInformation from "../DishInformation";
import Popup from "reactjs-popup";

class DishCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
    }
  }

  render() {
    if (this.state.redirect)
      return <Redirect to={'/dish/' + this.props.id}></Redirect>
    return <div className="dish-card">
      <div className="description">
        <ReactSVG
          src={this.props.logo}
        />
        <p className="title">
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

        <div className="dishcard_div_buttons">
          <div className="edit_button"><EditButton link={this.props.link} id={this.props.post.id}>Edit</EditButton></div>
          {typeof this.props.isRestaurant !== 'undefined' ? <div className="post_information_button"><DishInformation title={this.props.post.title} description={this.props.post.description} image={this.props.post.image} price={this.props.post.price} /></div> :
            <div className="post_information_button">
              <PostInformation title={this.props.post.title} description={this.props.post.description} image={this.props.post.image} id={this.props.post.id} />
            </div>}
          <Popup trigger={<div><img src="/img/ui/delete_button.png" /></div>} modal>

            {close => (

             
                <div className="actions">
                <p className="header" style={{marginBottom:"15px"}}> Are you sure to delete this {this.props.label} ? </p>
                <div className="button_actions">
                  <img src="/img/ui/btn_valider.png" onClick={() => { close(); this.props.onDelete(this.props.post.id) }} />
                  <img src="/img/ui/btn_annuler.png" onClick={() => { close(); }} />
                  </div>
                </div>
            )}

          </Popup>

        </div>
      </div>
      <div style={{ backgroundImage: `url(${this.props.post.image})` }} className="image">
        <Switch id={this.props.post.id} check={this.props.post.state == 1} index={this.props.index} parent_id= {this.props.parent_id} isSPost={this.props.isSPost}></Switch>
      </div>
    </div>;
  }
}

export default DishCard;
