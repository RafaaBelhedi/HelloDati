import React, { Component } from 'react';
import { callApi } from '../../Helpers'
import { UserContext } from '../Context'
import './Sidebar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import ReactSVG from 'react-svg'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom'
// import { Link } from 'react-router';
class Sidebar extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      services: [],
      expand: false,
      expandReception: false,
      expandLogistic: false,
      expandStat: false,
      sideaccess: [],
      postaccess: [{
        user_id: '',
        post_id: '',
        authorized: ''
      }]
    }
    this.logOut = this.logOut.bind(this)
  }

  async componentDidMount() {
    let post = await callApi("posts", {
      hotel_id: this.context.hotel_id,
      parent_id: null
    })
    let services = await callApi("posts", {
      hotel_id: this.context.hotel_id,
      parent_id: post.data[0].id
    })
    this.setState({ services: services.data })

    if (this.context.role === 2) {
      let sideaccess = await callApi('sideaccess/' + this.context.user_id)
      this.setState({ sideaccess: sideaccess.data[0] })
    }

    if (this.context.role === 2) {
      let postaccess = await callApi('postaccess/' + this.context.user_id)
      this.setState({ postaccess: postaccess.data })
    }
  }

  logOut() {
    this.props.logOut();
  }

  render() {
    console.log(this.state.postaccess.map(x => x.post_id), "postaccess")
    console.log(this.state.services.map(x => x.id), "postaccess")


    return (
      <nav>
        <div className="img-container" onClick={()=>{document.location.href = "/"}}>
          <img src="/img/login/login-logo.png" />
        </div>
        <ul className="dashboard-sidebar">
          <li className="sidebar-item">

            <ReactSVG
              src="/img/sidebar/menu.svg"
              className="svg-icon"
              id="svg-icon-dashboard"
            />
            <NavLink activeClassName="active-link" to="/">
              <p style={{ color: "white" }}>DASHBOARD
            </p>
            </NavLink>
          </li>



          {this.context.role == 3 &&


            <li className="sidebar-item" onClick={() => { this.setState({ expandReception: !this.state.expandReception }); this.setState({ expand: false }); this.setState({ expandLogistic: false }); this.setState({ expandStat: false }) }}>
              <ReactSVG
                src="/img/sidebar/front.svg"
                className="svg-icon"
              />

              <p>FRONT OFFICE
            </p>
              {this.state.expandReception ?
                <ReactSVG
                  src="/img/sidebar/activeList.svg"
                  className="svg-icon-list"
                />
                :
                <ReactSVG
                  src="/img/sidebar/inactiveList.svg"
                  className="svg-icon-list"
                />
              }
            </li>
          }
          {this.context.role == 3 &&

            <li className={this.state.expandReception ? 'expandedOffice hotel-frontOffice ' : 'hotel-frontOffice '}>
              <ul>
                <li> <NavLink activeClassName="active-link" to={'/guest'}><p>Guests</p></NavLink></li>
                {/* <li> <NavLink activeClassName="active-link" to={'/devices'}><p>Devices</p></NavLink></li> */}
                <li> <NavLink activeClassName="active-link" to={'/orders'}><p>Orders Reservations</p></NavLink></li>


              </ul>
            </li>
          }



          {this.context.role == 2 &&
            ((this.state.sideaccess.guests == 1) || (this.state.sideaccess.orders_reservations == 1)) &&
            <li className="sidebar-item" onClick={() => { this.setState({ expandReception: !this.state.expandReception }); this.setState({ expand: false }); this.setState({ expandLogistic: false }); this.setState({ expandStat: false }) }}>
              <ReactSVG
                src="/img/sidebar/front.svg"
                className="svg-icon"
              />

              <p>FRONT OFFICE
            </p>
              {this.state.expandReception ?
                <ReactSVG
                  src="/img/sidebar/activeList.svg"
                  className="svg-icon-list"
                />
                :
                <ReactSVG
                  src="/img/sidebar/inactiveList.svg"
                  className="svg-icon-list"
                />
              }
            </li>
          }
          {this.context.role == 2 &&
            <li className={this.state.expandReception ? 'expandedOffice hotel-frontOffice ' : 'hotel-frontOffice '}>
              <ul>
                {this.state.sideaccess.guests == 1 && <li> <NavLink activeClassName="active-link" to={'/guest'}><p>Guests</p></NavLink></li>}
                {this.state.sideaccess.orders_reservations == 1 && <li> <NavLink activeClassName="active-link" to={'/orders'}><p>Orders Reservations</p></NavLink></li>}


              </ul>
            </li>
          }




          {this.context.role == 3 &&


            <li className="sidebar-item" onClick={() => { this.setState({ expand: !this.state.expand }); this.setState({ expandReception: false }); this.setState({ expandLogistic: false }); this.setState({ expandStat: false }) }}>
              <ReactSVG
                src="/img/sidebar/service.svg"
                className="svg-icon"
              />
              <NavLink activeClassName="active-link" to="/service">
                <p>SERVICES
            </p></NavLink>
              {this.state.expand ?
                <ReactSVG
                  src="/img/sidebar/activeList.svg"
                  className="svg-icon-list"
                />
                :
                <ReactSVG
                  src="/img/sidebar/inactiveList.svg"
                  className="svg-icon-list"
                />
              }
            </li>}


          {this.context.role == 3 &&

            <li className={this.state.expand ? 'expanded hotel-services' : 'hotel-services'}>
              <ul>
                {this.state.services.map((x, i) => <li key={i}><NavLink activeClassName="active-link" to={'/service/' + x.id}><p>{x.title}</p></NavLink></li>)}
              </ul>
            </li>

          }


          {this.context.role == 2 &&
            this.state.sideaccess.services == 1 &&
            <li className="sidebar-item" onClick={() => { this.setState({ expand: !this.state.expand }); this.setState({ expandReception: false }); this.setState({ expandLogistic: false }); this.setState({ expandStat: false }) }}>
              <ReactSVG
                src="/img/sidebar/hand.svg"
                className="svg-icon"
              />
              <NavLink activeClassName="active-link" to="/service">
                <p>SERVICES
         </p></NavLink>
              {this.state.expand ?
                <ReactSVG
                  src="/img/sidebar/activeList.svg"
                  className="svg-icon-list"
                />
                :
                <ReactSVG
                  src="/img/sidebar/inactiveList.svg"
                  className="svg-icon-list"
                />
              }
            </li>}

          {this.context.role == 2 &&
            <li className={this.state.expand ? 'expanded hotel-services' : 'hotel-services'}>
              <ul>
                {this.state.services.map((x, i) => (
                  this.state.postaccess.map((y) => (
                    ((x.id == y.post_id) && (y.authorized == 1)) && <li key={i}><NavLink activeClassName="active-link" to={'/service/' + x.id}><p>{x.title}</p></NavLink></li>
                  ))))}
              </ul>
            </li>

          }


          {this.context.role == 3 &&

            <li className="sidebar-item" onClick={() => { this.setState({ expandLogistic: !this.state.expandLogistic }); this.setState({ expand: false }); this.setState({ expandReception: false }); this.setState({ expandStat: false }) }}>
              <ReactSVG
                src="/img/sidebar/logistic.svg"
                className="svg-icon"
              />

              <p>LOGISTIC
            </p>
              {this.state.expandLogistic ?
                <ReactSVG
                  src="/img/sidebar/activeList.svg"
                  className="svg-icon-list"
                />
                :
                <ReactSVG
                  src="/img/sidebar/inactiveList.svg"
                  className="svg-icon-list"
                />
              }

            </li>
          }

          {this.context.role == 3 &&
            <li className={this.state.expandLogistic ? 'expandedOffice hotel-frontOffice ' : 'hotel-frontOffice '}>
              <ul>
                <li> <NavLink activeClassName="active-link" to={'/rooms'}><p>Rooms</p></NavLink></li>
                <li> <NavLink activeClassName="active-link" to={'/devices'}><p>Devices</p></NavLink></li>
                <li> <NavLink activeClassName="active-link" to={'/employees'}><p>Employees</p></NavLink></li>

              </ul>
            </li>
          }





          {this.context.role == 2 &&
            ((this.state.sideaccess.rooms == 1) || (this.state.sideaccess.devices == 1) || (this.state.sideaccess.employees == 1)) &&
            <li className="sidebar-item" onClick={() => { this.setState({ expandLogistic: !this.state.expandLogistic }); this.setState({ expand: false }); this.setState({ expandReception: false }); this.setState({ expandStat: false }) }}>
              <ReactSVG
                src="/img/sidebar/logistic.svg"
                className="svg-icon"
              />

              <p>LOGISTIC
            </p>
              {this.state.expandLogistic ?
                <ReactSVG
                  src="/img/sidebar/activeList.svg"
                  className="svg-icon-list"
                />
                :
                <ReactSVG
                  src="/img/sidebar/inactiveList.svg"
                  className="svg-icon-list"
                />
              }

            </li>
          }
          {this.context.role == 2 &&
            <li className={this.state.expandLogistic ? 'expandedOffice hotel-frontOffice ' : 'hotel-frontOffice '}>
              <ul>
                {this.state.sideaccess.rooms == 1 && <li> <NavLink activeClassName="active-link" to={'/rooms'}><p>Rooms</p></NavLink></li>}
                {this.state.sideaccess.devices == 1 && <li> <NavLink activeClassName="active-link" to={'/devices'}><p>Devices</p></NavLink></li>}
                {this.state.sideaccess.employees == 1 && <li> <NavLink activeClassName="active-link" to={'/employees'}><p>Employees</p></NavLink></li>}

              </ul>
            </li>
          }



          {this.context.role == 3 &&

            <li className="sidebar-item">
              <ReactSVG
                src="/img/ui/notifications.svg"
                className="svg-icon"
              />
              <NavLink activeClassName="active-link" to="/notifications">
                <p className='notification_style'>NOTIFICATIONS
              </p>
              </NavLink>
            </li>

          }

          {this.context.role == 3 &&

            <li className="sidebar-item">
              <ReactSVG
                src="/img/sidebar/hand.svg"
                className="svg-icon"
              />
              <NavLink activeClassName="active-link" to="/demandes">
                <p className='notification_style'>DEMANDES
  </p>
              </NavLink>
            </li>

          }

          {this.context.role == 2 &&
            this.state.sideaccess.notifications == 1 &&
            <li className="sidebar-item">
              <ReactSVG
                src="/img/ui/notifications.svg"
                className="svg-icon"
              />
              <NavLink activeClassName="active-link" to="/notifications">
                <p className='notification_style'>NOTIFICATIONS
              </p>
              </NavLink>
            </li>
          }

          {this.context.role == 3 &&
            <li className="sidebar-item">
              <ReactSVG
                src="/img/ui/chat.svg"
                className="svg-icon"
              />
              <NavLink activeClassName="active-link" to="/chat">
                <p>CHAT
              </p>
              </NavLink>
            </li>

          }
          {this.context.role == 2 &&
            this.state.sideaccess.chat == 1 &&
            <li className="sidebar-item">
              <ReactSVG
                src="/img/ui/chat.svg"
                className="svg-icon"
              />
              <NavLink activeClassName="active-link" to="/chat">
                <p>CHAT
              </p>
              </NavLink>
            </li>
          }
          {this.context.role == 3 &&
            <li className="sidebar-item">
              <ReactSVG
                src="/img/sidebar/logistics.svg"
                className="svg-icon"
              />
              <NavLink activeClassName="active-link" to="/history">
                <p>History
              </p>
              </NavLink>
            </li>
          }

          {this.context.role == 2 &&
            this.state.sideaccess.history == 1 &&
            <li className="sidebar-item">
              <ReactSVG
                src="/img/sidebar/logistic.svg"
                className="svg-icon"
              />
              <NavLink activeClassName="active-link" to="/history">
                <p>History
              </p>
              </NavLink>
            </li>
          }


          {(this.context.role == 3) ?
            <li className="sidebar-item">
              <ReactSVG
                src="/img/sidebar/hotel.svg"
                className="svg-icon"
              />
              <NavLink activeClassName="active-link" to="/hotels">
                <p> HOTELS
            </p>
              </NavLink>
            </li>
            : null}
          {/* {this.context.role == 3 ? <li className="sidebar-item">
            <ReactSVG
              src="/img/ui/hot-air-balloon.svg"
              className="svg-icon"
            />
            <NavLink activeClassName="active-link" to="/extra/28">
              <p>CITY GUIDE
              </p>
            </NavLink>
          </li> : ''} */}
          <div className="button_help">
            <img src="/img/sidebar/help.png" style={{ height: "16px", width: "16px" }} />
            <p>Help</p>
          </div>
        </ul>

        <div className="logout-container">
          <Link to="/"><p onClick={this.logOut}><FontAwesomeIcon color="red" icon={faSignOutAlt} rotation={180} /> Log Out</p></Link>
        </div>
      </nav>);
  }
}

Sidebar.contextType = UserContext

export default Sidebar;