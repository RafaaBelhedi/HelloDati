import React, { Component } from 'react';
import { callApi } from '../../../Helpers';
import './DrinksContainer.scss'
import PostCard from '../../UI/PostCard'
import ReactSVG from 'react-svg'
import RestaurantBar from '../../UI/RestaurantBar'
import { Link } from 'react-router-dom'
import AddButton from '../../UI/AddButton/AddButton';
class DrinksContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurant: {},
      dishes: [],
      categories: [],
      id: this.props.service.id
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateTheState = this.updateTheState.bind(this);
  }
  async componentDidMount() {
    let restaurant = await callApi('post/' + this.state.id)
    this.setState({ restaurant: restaurant.data[0] })

    let categories = await callApi('posts', { parent_id: this.state.restaurant.id, state: 1 })
    this.setState({ categories: categories.data })
    let dishes = []
    this.state.categories.forEach(async x => {
      let a = await callApi('posts', { parent_id: x.id })
      dishes = [...dishes, ...a.data]
      this.setState({ dishes })
    })
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
    console.log(this.state.dishes,"haw fech iraja3")
    return <div className="restaurant-container">
      <RestaurantBar isBar={true} update={this.componentDidMount} setId={() => 5} categories={this.state.categories} id={this.state.restaurant.id} title={this.state.restaurant.title} opening_time={this.state.restaurant.opening_time}></RestaurantBar>
      <div className="dish-container">
        {this.state.dishes.map((x, i) => <PostCard isRestaurant={true} link="dish" post={x} onDelete={this.updateTheState} logo={'/img/services/forme-2.svg'}  index={i}  parent_id={this.props.service.id} isSPost={true}></PostCard>)}
      </div>
    </div>;
  }
}

export default DrinksContainer;
