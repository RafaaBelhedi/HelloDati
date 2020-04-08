import React, { Component } from 'react';
import { callApi } from '../../../Helpers';
import './RestaurantContainer.scss'
import RestaurantCard from '../../UI/RestaurantCard';
import ReactSVG from 'react-svg'
import { Link } from 'react-router-dom'
import AddButton from '../../UI/AddButton/AddButton';
class RestaurantContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants: [
        // { id:this.props.service.id }
      ]
    }
    this.updateTheState = this.updateTheState.bind(this);
  }
  async updateTheState(id) {
    let test = await callApi('/post/' + id, {}, 'DELETE');
    let restaurants = await callApi('posts', { parent_id: this.props.service.id });
    this.setState({ restaurants: restaurants.data });
  }
  async componentDidMount() {
    let restaurants = await callApi('posts', { parent_id: this.props.service.id })
    this.setState({ restaurants: restaurants.data })
  }


  render() {
    return (
      <>
        <div className="restaurants">
          <AddButton id={this.props.service.id} link="restaurant" return={window.location.href} params={{ parent_id: this.props.service.id }} style={{ width: '31%',/*minWidth:'450px',*/height: '200px', border: '1px dashed #7a8da1', marginLeft: '-2px' }}>
            <ReactSVG src="/img/restaurant/plus.svg" />
            <p>
              Add
        </p>
          </AddButton>

          {this.state.restaurants.map((x, i) => {
            return (<React.Fragment>
              <RestaurantCard link={'restaurant'} check={x.state == 1} id={x.id} image={x.image} title={x.title} description={x.description} time={x.opening_time} onDelete={this.updateTheState} index={i} parent_id={this.props.service.id} isSPost={true} />
            </React.Fragment>
            )
          })}
        </div>
      </>);
  }
}

export default RestaurantContainer;
