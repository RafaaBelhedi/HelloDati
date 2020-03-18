import React, { Component } from 'react';
import './OrdersR.scss'
import OrderReservationSearch from './OrderReservationSearch/OrderReservationSearch'
import OrderReservatinoContainer from './OrderReservatinoContainer/OrderReservationContainer'
import { NotifContext } from '../Context'
import { UserContext } from '../Context'

class OrdersR extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        room: '',
        tourist: '',
        device: '',
        reservation: '',
        status: '',
        device_imei: '',
      },
      orders: []
    }
    this.setData = this.setData.bind(this)
  }

  setData(data) {
    this.setState({ data: { ...data } })
  }

  render() {
    console.log(this.context.hotel_id[0],"i 'am here")
    return <div className="history-container">
      <section className="history">
        <NotifContext.Consumer>
          {context => (
            <OrderReservationSearch update={this.setData} data={this.state.data} />
          )}
        </NotifContext.Consumer>
        <NotifContext.Consumer>
          {context => (
            <OrderReservatinoContainer data={this.state.data} context={this.context.hotel_id[0]}/>
          )}
        </NotifContext.Consumer>
      </section>
    </div>;
  }
}
OrdersR.contextType = UserContext

export default OrdersR;
