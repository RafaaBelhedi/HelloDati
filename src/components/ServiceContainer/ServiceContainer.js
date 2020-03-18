import React, { Component } from 'react';
import DrinksContainer from './DrinksContainer'
import DiscoverContainer from './DiscoverContainer'
import RestaurantContainer from './RestaurantContainer'
import LeisureContainer from './LeisureContainer'
import GalleryContainer from './GalleryContainer'
import MeetingContainer from './MeetingContainer'
import ContactContainer from './ContactContainer'
import EventContainer from './EventContainer'
import ConciergeContainer from './ConciergeContainer'

import { callApi } from '../../Helpers';

class ServiceContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      service: {},
      posts: [],
    }
  }

  async componentDidMount() {
    let service = await callApi('post/' + this.props.match.params.id)
    this.setState({ service: service.data[0] })
    console.log(this.state.service,"service")
  }

  async componentDidUpdate() {
    if (this.props.match.params.id != this.state.service.id) {
      let service = await callApi('post/' + this.props.match.params.id)
      this.setState({ service: service.data[0] })
    }
  }

  render() {
    switch (this.state.service.layout_xml_template) {
      case 1:
        return <RestaurantContainer service={this.state.service}></RestaurantContainer>
      case 2:
        return <DrinksContainer service={this.state.service}></DrinksContainer>
      case 3:
        return <LeisureContainer service={this.state.service}></LeisureContainer>
      case 4:
        return <GalleryContainer service={this.state.service}></GalleryContainer>
      case 5:
        return <MeetingContainer service={this.state.service}></MeetingContainer>
      case 6:
        return <ContactContainer service={this.state.service}></ContactContainer>
      case 7:
        return <EventContainer service={this.state.service}></EventContainer>
      case 8:
        return <DiscoverContainer service={this.state.service}></DiscoverContainer>
      case 11:
        return <ConciergeContainer service={this.state.service}></ConciergeContainer>
      default:
        return null
    }
  }
}

export default ServiceContainer;
