import React, { Component } from 'react';
import './Restaurant.scss'
import { callApi } from '../../../Helpers';
import RestaurantBar from '../../UI/RestaurantBar'
import DishCard from '../../UI/PostCard/DishCard';

class Restaurant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurant: {},
      dishes: [],
      categories: [],
      id: this.props.match.params.id
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateTheState = this.updateTheState.bind(this);
  }
  async componentDidMount() {
    let restaurant = await callApi('post/' + this.props.match.params.id);
    this.setState({ restaurant: restaurant.data[0] })
    let categories = await callApi('posts', { parent_id: this.state.restaurant.id, state: 1 });
    this.setState({ categories: categories.data });
    let dishes = [];
    this.state.categories.forEach(async x => {
      let a = await callApi('posts', { parent_id: x.id });
      dishes = [...dishes, ...a.data];
      this.setState({ dishes });
    });
  }

  async updateTheState(id) {
    await callApi('/post/' + id, {}, 'DELETE');
    let dishes = []
    this.state.categories.forEach(async x => {
      let a = await callApi('posts', { parent_id: x.id })
      dishes = [...dishes, ...a.data]
      this.setState({ dishes });
    })
  }
  render() {
    return <div className="restaurant-container">
      <RestaurantBar update={this.componentDidMount} categories={this.state.categories} id={this.state.restaurant.id} title={this.state.restaurant.title} opening_time={this.state.restaurant.opening_time}></RestaurantBar>
      <div className="dish-container">
        {this.state.dishes.map(x => <DishCard isRestaurant={true} link="dish" post={x} onDelete={this.updateTheState} showTheButton={false} parent_id={this.state.id}></DishCard>)}
      </div>
    </div>;
  }
}

export default Restaurant;
