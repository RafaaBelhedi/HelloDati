import React, { Component } from 'react';
import { callApi } from '../../Helpers';
import './ExtraPosts.scss'
import ExtraPostCard from '../UI/ExtraPostCard'
import ReactSVG from 'react-svg'
import {Link} from 'react-router-dom'
import AddButton from "../UI/AddButton";
class ExtraPosts extends Component {
  constructor(props) {
    super(props)
    this.state={
      extra: [],
      id:this.props.match.params.id
    }
    console.log("ss")
  }

  async componentDidMount(){
    let extra = await callApi('extra_posts',{parent_id:this.state.id})
    this.setState({extra:extra.data})
  }

  async componentDidUpdate(props){
    console.log(props.match.params.id)
    console.log(this.state.id)
    if(props.match.params.id!=this.state.id){
      this.setState({id:this.props.match.params.id})
      let extra = await callApi('extra_posts',{parent_id:props.match.params.id})
      this.setState({extra:extra.data})
    }
  }

  render() {
    return (
    <div className="restaurants">
      <AddButton id={this.props.match.params.id} link="extra" return={window.location.href} params={{ parent_id: 28 }} style={{width:'31%',/*minWidth:'450px',*/height:'200px', border: '1px dashed #7a8da1'}}>
        <ReactSVG src="/img/restaurant/plus.svg"/>
        <p>
          Add
        </p>
      </AddButton>
      {this.state.extra.map(x=>{
        return (
          <ExtraPostCard link="extra" post={x}/>
        )
      })}      
    </div>);
  }
}

export default ExtraPosts;
