import React, { Component } from 'react';
import ReactSVG from 'react-svg'
import './RestaurantCard.scss'
import { Redirect } from 'react-router-dom'
import Switch from '../Switch';
import EditButton from '../EditButton';
import PostInformation from '../PostInformation';
import Popup from "reactjs-popup";

class RestaurantCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
    }
  }

  render() {
    if (this.state.redirect)
      return <Redirect to={'/restaurant/' + this.props.id}></Redirect>
    return <div className="restaurant-card">
      <div className="description">
        <ReactSVG
          src="/img/restaurant/dish.svg"
        />
        <p className="title" onClick={() => this.setState({ redirect: true })}>
          {this.props.title}
        </p>
        <p className="desc">
          {this.props.description || 'This restaurant doesn\'t have a description'}
        </p>
        <div className="div_buttons">
          <div className="edit_button"><EditButton link={this.props.link} id={this.props.id}>Edit</EditButton></div>
          <div className="post_information_button"><PostInformation title={this.props.title} description={this.props.description} image={this.props.image} id={this.props.id} /></div>
          <Popup trigger={<div><img src="/img/ui/delete_button.png" /></div>} modal>

            {close => (

              <div className="actions">
                <p className="header" style={{ marginBottom: "15px" }}> Are you sure to delete this restaurant ? </p>
                <div className="button_actions">
                  <img src="/img/ui/btn_valider.png" onClick={() => { close(); this.props.onDelete(this.props.id) }} />
                  <img src="/img/ui/btn_annuler.png" onClick={() => { close(); }} />
                </div>
              </div>
            )}

          </Popup>

        </div>
      </div>

      <div style={{ backgroundImage: `url(${this.props.image})` }} className="image">
        <Switch id={this.props.id} check={this.props.check} index={this.props.index} parent_id={this.props.parent_id} isSPost={this.props.isSPost}></Switch>
      </div>
    </div>;
  }
}

export default RestaurantCard;
