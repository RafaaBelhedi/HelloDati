import React, { Component } from 'react';
import './CategoryContainer.scss'
import { callApi } from '../../../../Helpers';
import RestaurantBar from '../../../UI/RestaurantBar'
import DishCard from '../../../UI/PostCard/DishCard';
import AddButton from '../../../UI/AddButton/AddButton';
import ReactSVG from 'react-svg';

class CategoryContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurant: [],
      dishes: [],
      category: [],
      categories: [],
      id: this.props.match.params.id,
      allDishes: []
    }
    this.setId = this.setId.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateTheState = this.updateTheState.bind(this);
  }

  async updateTheState(id) {
    await callApi('/post/' + id, {}, 'DELETE');
    let a = await callApi('posts', { parent_id: this.state.category.id });
    let dishes = a.data;
    this.setState({ dishes });
  }

  async componentDidMount() {
    let category = await callApi('post/' + this.state.id);
    this.setState({ category: category.data[0] });
    let restaurant = await callApi('post/' + this.state.category.parent_id);
    this.setState({ restaurant: restaurant.data[0] });
    let categories = await callApi('posts', { parent_id: this.state.category.parent_id, state: 1 });
    this.setState({ categories: categories.data });
    let a = await callApi('posts', { parent_id: this.state.category.id });
    let dishes = a.data;
    this.setState({ dishes });
    this.state.categories.forEach(async category => {
      let query = await callApi('posts', { parent_id: category.id });
      dishes = [...dishes, ...query.data];
      this.setState({ allDishes: dishes });

    });
  }

  async componentDidUpdate(props) {
    if (props.match.params.id != this.state.id) {
      this.setState({ id: this.props.match.params.id })
      let category = await callApi('post/' + this.props.match.params.id)
      this.setState({ category: category.data[0] })
      let a = await callApi('posts', { parent_id: this.state.category.id, state: 1 })
      let dishes = a.data
      this.setState({ dishes });
    }
  }

  async setId(id) {
    this.setState({ id });
  }

  render() {
    return <div className="restaurant-container">
      <RestaurantBar update={this.componentDidMount} setId={this.setId} categories={this.state.categories} id={this.state.restaurant.id} title={this.state.restaurant.title} opening_time={this.state.restaurant.opening_time}></RestaurantBar>
      <div className="dish-container">
        {(this.state.category.id !== 5 && this.state.category.id !== 1) && <AddButton id={this.state.id} link="dish" return={window.location.href} params={{ parent_id: this.state.category.id }} style={{ marginLeft: '15px', height: '200px', width: "31%", boxSizing: 'border-box', border: '1px dashed #1A5889' }}>
          <ReactSVG src="/img/restaurant/plus.svg" />
          <p>Add</p>
        </AddButton>}
        {this.state.category.id === 5 || this.state.category.id === 1 ? this.state.allDishes.map(x => <DishCard link="dish" post={x} onDelete={this.updateTheState}></DishCard>) : this.state.dishes.map(x => <DishCard link="dish" post={x} onDelete={this.updateTheState}></DishCard>)}

      </div>
    </div>;
  }
}

export default CategoryContainer;
