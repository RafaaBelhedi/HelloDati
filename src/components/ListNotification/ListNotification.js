import React, { Component } from 'react';
import { callApi } from '../../Helpers';
import Order from './OrderComponent/Order'
import Reservation from './ReservationComponent/Reservation'
import './ListNotification.scss';
import { UserContext, NotifContext } from '../Context'
class ListNotification extends Component {
  constructor(props) {
    super(props)
    this.state = {

      historyItems: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.direction = this.direction.bind(this)

  }
  async componentDidMount() {
    let historyItems = await callApi('shopping_orders', { hotel_id: this.context.hotel_id[0] })

    this.setState({ historyItems: historyItems.data.filter(x => x.status == 1).map(x => { return { ...x, show: false } }) })
  }
  async handleClick(id) {


    await callApi('shopping_order/' + id, { seen: 1 }, 'PUT').then(res => { console.log(res, "responsehhh") })

  };
  direction(path) {
    window.location.href = path
  }

  render() {
    // console.log(this.context,"lalala") 

    return <NotifContext.Consumer>
      {context => (
        <div className="list-notification-container">
          <div className="title-notif">Notification</div>
          <div className="notif-box">
            {this.state.historyItems.map(reser => {
              return reser.reservation == 0 ?
                <Order reser={reser} isSeen={this.handleClick} direction={this.direction} /> :
                <Reservation reser={reser} isSeen={this.handleClick} direction={this.direction} />
            })}
          </div>
          <div className="view-all" onClick={event => window.location.href = '/history'}>
            <p>view all</p>
          </div>
        </div>
      )}
    </NotifContext.Consumer>
  }






}
ListNotification.contextType = UserContext

export default ListNotification;