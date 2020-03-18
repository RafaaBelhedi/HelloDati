import React, { Component } from 'react';
import './RestaurantBar.scss'
import ReactSVG from 'react-svg';
import { callApi } from '../../../Helpers';
import CategoryButton from '../CategoryButton'
import { NavLink } from 'react-router-dom'
import PostInformation from '../PostInformation';
import BarReviews from '../BarReviews/BarReviews';
class RestaurantBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      categories: [],
      userRole: -1
    }
  }

  async componentDidMount() {
    let privileges = await callApi('/auth/privileges', {}, 'GET');
    this.setState({ userRole: privileges.role });
  }



  render() {
    return <div className='restaurant-bar'>
      <div className="description">
        <ReactSVG src={this.props.isBar ? "/img/services/forme-2.svg" : "/img/restaurant/dish.svg"} />
        <p className="title">
          {this.props.title}
        </p>
        {this.props.isBar === true && <BarReviews id={this.props.id} />}
        <p className="opening-time">
        </p>
      </div>
      <div className="categories">
        {this.props.categories.map(category => <NavLink to={'/category/' + category.id} activeClass='active'>{category.title}</NavLink>)}
        {this.state.userRole === 3 && <CategoryButton id={this.props.id} update={this.props.update} categories={this.props.categories}></CategoryButton>}

      </div>
    </div>;
  }
}

export default RestaurantBar;
