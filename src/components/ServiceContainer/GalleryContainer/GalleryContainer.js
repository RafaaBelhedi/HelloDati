import React, { Component } from 'react';
import { callApi } from '../../../Helpers';
import './GalleryContainer.scss'
import PostCard from '../../UI/PostCard'
import ReactSVG from 'react-svg'
import {Link} from 'react-router-dom'
import AddButton from '../../UI/AddButton/AddButton';
class GalleryContainer extends Component {
  constructor(props) {
    super(props)
    this.state={
      restaurants: []
    }
  }

  async componentDidMount(){
    let restaurants = await callApi('posts',{parent_id:this.props.service.id})
    this.setState({restaurants:restaurants.data})
  }

  render() {
    return (
    <div className="restaurants">
      <AddButton id={this.props.service.id} link="wellbeing" return={window.location.href} params={{ parent_id: this.props.service.id }} style={{width:'31%',/*minWidth:'450px',*/height:'200px'}}>
        <ReactSVG src="/img/restaurant/plus.svg"/>
        <p>
          Add
        </p>
      </AddButton>
      {this.state.restaurants.map((x,i)=>{
        return (
          <PostCard link="gallery" post={x}  index={i}  parent_id={this.props.service.id} isSPost={true}/>
        )
      })}      
    </div>);
  }
}

export default GalleryContainer;
