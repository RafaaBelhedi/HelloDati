import React, { Component } from 'react';
import './ServiceCard.css'
import { Redirect } from 'react-router-dom'
import ReactSVG from 'react-svg';
import { Link } from 'react-router-dom';
import { callApi } from '../../../Helpers';
import { UserContext } from '../../Context';
import Popup from "reactjs-popup";
import Switch from '../Switch';
class ServiceCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      image: '',

    }
    switch (this.props.service.layout_xml_template) {
      case 1:
        this.state = { image: '/img/services/restaurant.png' }
        break;
      case 2:
        this.state = { image: '/img/services/Boisson.png' }
        break;
      case 3:
        this.state = { image: '/img/services/loisir.png' }
        break;
      case 4:
        this.state = { image: '/img/services/Gallerie.png' }
        break;
      case 5:
        this.state = { image: '/img/services/reunion.png' }
        break;
      case 6:
        this.state = { image: '/img/services/Contact.png' }
        break;
      case 7:
        this.state = { image: '/img/services/evenement.png' }
        break;
      case 8:
        this.state = { image: '/img/services/bien_etre.png' }
        break;
      case 9:
        this.state = { image: '/img/services/weather.png' }
        break;
      case 10:
        this.state = { image: '/img/services/prayer.png' }
        break;
      case 11:
        this.state = { image: '/img/services/conceirge.png' }
        break;
      default:
      // this.state = { image: this.props.service.image }
    }

  }


  render() {
    if (this.state.redirect)
      return <Redirect to={'/service/' + this.props.service.id}></Redirect>

    return (

      <div style={{
        backgroundImage: `url(${this.props.service.layout_xml_template == 1 && '/img/services/restaurant.png' ||
          this.props.service.layout_xml_template == 2 && '/img/services/Boisson.png' || this.props.service.layout_xml_template == 3 && '/img/services/loisir.png'
          || this.props.service.layout_xml_template == 4 && '/img/services/Gallerie.png' || this.props.service.layout_xml_template == 5 && '/img/services/reunion.png'
          || this.props.service.layout_xml_template == 6 && '/img/services/Contact.png' || this.props.service.layout_xml_template == 7 && '/img/services/evenement.png'
          || this.props.service.layout_xml_template == 8 && '/img/services/bien_etre.png' || this.props.service.layout_xml_template == 9 && '/img/services/weather.png'
          || this.props.service.layout_xml_template == 10 && '/img/services/prayer.png' || this.props.service.layout_xml_template == 11 && '/img/services/conceirge.png'})`
      }}
        class="service-card">

        <div onClick={() => { this.setState({ redirect: true }) }} style={{ height: "90%", width: " 90%", display: "flex", alignItems: "flex-end" }} className="service-name">
          <p style={{ color: '#' + this.props.service.title_color }} >{this.props.service.title}</p>
        </div>
        <div className="service-Edit" >
          <div className="service-info">
            <ReactSVG src="/img/services/vue.svg" />
            <p>{this.props.service.nbr_views} Views</p>
          </div>
          <div className="edit_Button">
            <div className="edit_image">

              <Link to={'/edit/service/' + this.props.service.id} >
                <img src="/img/ui/editService.png" style={{ width: "32px" }} />
              </Link>
            </div>
            <div className="switch-edit" >

              <Switch id={this.props.id} index={this.props.index} check={this.props.check} isSPost={this.props.isSPost}></Switch>
            </div>
          </div>
        </div>
      </div >
    )
  }
}
ServiceCard.contextType = UserContext
export default ServiceCard;
