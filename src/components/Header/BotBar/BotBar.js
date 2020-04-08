import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './BotBar.scss'
import { Route, Switch } from "react-router-dom";
import { faStar, faSync } from '@fortawesome/free-solid-svg-icons'
import { Router, browserHistory, IndexRoute } from 'react-router'
import PropTypes from "prop-types";
import { UserContext } from '../../Context'
import { withRouter } from "react-router";
import { throwStatement } from '@babel/types';
import { callApi } from '../../../Helpers';

class BotBar extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props)
    this.state = {
      titleMenu: '',
      services: [],
      service: [],
      open: true,
      goBack: "/img/ui/goBackInactive.png",
      nextPage: "/img/ui/nextPageInactive.png"
    }
    this.imageRef = React.createRef()
    this.componentsHandler = this.componentsHandler.bind(this)

  }
  componentsHandler(title) {
    switch (title) {
      case '/':
        this.setState({ titleMenu: 'HOME' })
        break
      case '/service':
        this.setState({ titleMenu: 'SERVICES' })
        break
      case '/devices':
        this.setState({ titleMenu: 'DEVICES' })
        break
      // case '/devices':
      //   this.setState({ titleMenu: 'DEVICES' })
      //   break
      case '/guest':
        this.setState({ titleMenu: 'GUESTS' })
        break
      case '/rooms':
        this.setState({ titleMenu: 'ROOMS' })
        break
      case '/hotels':
        this.setState({ titleMenu: 'HOTELS' })
        break
      case '/employees':
        this.setState({ titleMenu: 'EMPLOYEES' })
        break
      case '/statistics':
        this.setState({ titleMenu: 'STATISTICS' })
        break
      case '/notifications':
        this.setState({ titleMenu: 'NOTIFICATIONS' })
        break
      case '/history':
        this.setState({ titleMenu: 'HISTORY' })
        break
      case '/chat':
        this.setState({ titleMenu: 'CHAT' })
        break
      case '/orders':
        this.setState({ titleMenu: 'ORDERS RESERVATIONS' })
        break
      // case '/orders':
      //   this.setState({ titleMenu: 'ORDERS RESERVATIONS' })
      //   break
      case '/demandes':
        this.setState({ titleMenu: 'DEMANDES' })
        break
      default:
    }
  }
  async componentDidMount() {
    this.componentsHandler(this.props.location.pathname);
    let post = await callApi("posts", {
      hotel_id: this.context.hotel_id[0],
      parent_id: null
    });
    let services = await callApi("posts", {
      hotel_id: this.context.hotel_id[0],
      parent_id: post.data[0].id
    });

    if (services.data.length != 0) {
      this.setState({ services: services.data })
      let service = await callApi("posts", {
        hotel_id: this.context.hotel_id[0],
        parent_id: services.data[0].id
      })
      this.setState({ service: service.data })
    }

  }
  goForward() {
    window.history.forward();
  }


  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.componentsHandler(this.props.location.pathname)
    }
  }
  render() {
    let input = this.props.location.pathname;
    let fields = input.split('/');
    let service = fields[1];
    let id = fields[2];
    const { match, location, history } = this.props;
    const hotel = this.props.hotel;
    let stars = []

    return (<div className="botbar">
      {this.props.location.pathname !== "/" &&
        <div className="button_navigation">
          <img src={this.state.goBack} style={{ width: "32px", height: "32px" }} onClick={() => { this.props.history.goBack(); this.setState({ goBack: "/img/ui/goBack.png", nextPage: "/img/ui/nextPageInactive.png" }) }} />
          <img src={this.state.nextPage} style={{ width: "32px", height: "32px" }} onClick={() => { this.goForward(); this.setState({ nextPage: "/img/ui/nextPage.png", goBack: "/img/ui/goBackInactive.png" }) }} />
        </div>
      }
      <div>
        <p className="titleMenu">
          {id ?
            this.state.services.filter(x => '/service/' + x.id == '/' + `${service}` + '/' + id).map(x => "SERVICE > " + x.title.toUpperCase())

            : this.state.titleMenu

          }
          {id ?
            this.state.service.filter(x => '/restaurant/' + x.id == '/' + `${service}` + '/' + +id).map(x => "SERVICE > RESTAURANT > " + x.title.toUpperCase())
            : ""}
          {service == "edit" && id == "guest" ?
            "  EDIT GUESTS"
            : ""}
          {service == "add" && id == "guest" ?
            "  ADD GUESTS"
            : ""}
          {service == "edit" && id == "room" ?
            "  EDIT Rooms"
            : ""}
          {service == "add" && id == "room" ?
            "  ADD ROOMS"
            : ""}
          {service == "edit" && id == "device" ?
            "  EDIT Devices"
            : ""}
          {service == "add" && id == "device" ?
            "  ADD Devices"
            : ""}
          {service == "emlpoyee" && id == "edit" ?
            "  EDIT Employees"
            : ""}
          {service == "add" && id == "employee" ?
            "  ADD EMPLOYEES"
            : ""}
          {service == "add" && id == "restaurant" ?
            "  ADD RESTAURANTS"
            : ""}
          {service == "add" && id == "meetings" ?
            "  ADD MEETINGS"
            : ""}
          {service == "add" && id == "hotel" ?
            "  ADD HOTELS"
            : ""}
          {service == "edit" && id == "hotel" ?
            "  EDIT HOTELS"
            : ""}
          {service == "restaurant" && id == "edit" ?
            "  EDIT RESTAURANT"
            : ""}
          {service == "meeting" && id == "edit" && "  EDIT MEETING"}

          {service == "edit" && id == "service" && "  EDIT SERVICE'S TITLE"}


        </p>
      </div>
    </div>
    );
  }
}
BotBar.contextType = UserContext
export default withRouter(BotBar);