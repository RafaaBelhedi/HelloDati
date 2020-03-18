import React, { Component } from 'react';
import { callApi } from '../../../Helpers';
import './ConciergeContainer.scss'
import PostCard from '../../UI/PostCard'
import ReactSVG from 'react-svg'
import { Link } from 'react-router-dom'
import AddButton from '../../UI/AddButton/AddButton';
class EventContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      concierge: []
    }
    this.updateTheState = this.updateTheState.bind(this);
  }

  async componentDidMount() {
    let concierge = await callApi('posts', { parent_id: this.props.service.id })
    this.setState({ concierge: concierge.data })
  }
  async updateTheState(id) {
    await callApi('/post/' + id, {}, 'DELETE');
    let concierge = await callApi('posts', { parent_id: this.props.service.id });
    this.setState({ concierge: concierge.data });
  }


  render() {
    return (
      <div className="restaurants">
        <AddButton id={this.props.service.id} link="concierges" return={window.location.href} params={{ parent_id: this.props.service.id }} style={{ width: '31%',/*minWidth:'450px',*/height: '200px', border: '1px dashed #7a8da1' }}>
          <ReactSVG src="/img/restaurant/plus.svg" />
          <p>
            Add
        </p>
        </AddButton>
        {this.state.concierge.map((x,i) => {
          return (
            <PostCard link="concierge" post={x} onDelete={this.updateTheState} logo={'/img/services/forme-5.svg'}  index={i}  parent_id={this.props.service.id} isSPost={true} />
          )
        })}
      </div>);
  }
}

export default EventContainer;