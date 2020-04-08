import React, { Component } from 'react';
import { callApi } from '../../../Helpers';
import HistoryItem from '../../UI/HistoryItem'
import OrderPopover from "../../UI/OrderPopover"
import './OrderReservationContainer.scss';
import { NotifContext } from '../../Context'


class OrderReservationContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      historyItems: [],
      color: ""
    }
    this.toggle = this.toggle.bind(this)
    this.update = this.update.bind(this)
  }

  async componentDidMount() {
    let historyItems = await callApi('shopping_orders', { hotel_id: this.props.context })
    this.setState({ historyItems: historyItems.data.filter(x => (x.status !== 0) && (x.status !== 3) && (x.status !== 2) && (x.status !== 4) && (x.status !== 5)).map(x => { return { ...x, show: false } }) })
    console.log(historyItems, "lalalahistory")
    this.update();
  }

  componentWillUnmount() {
    // clearInterval(this.state.interval)
  }

  renderStatus(status) {
    switch (status) {
      case 1:
        return <><span style={{ backgroundColor: "#F0B17A" }}></span><p>Waiting</p></>
      case 2:
        return <><span style={{ backgroundColor: "#879CBF" }}></span><p>In Progress</p></>
      case 3:
        return <><span style={{ backgroundColor: "#CF6E6E" }}></span><p>Rejected</p></>
      case 5:
        return <><span style={{ backgroundColor: "#86C7CC" }}></span><p>Delivered</p></>
    }
  }

  update(i, data) {
    let historyItems = [...this.state.historyItems]
    let historyrender = historyItems.filter((item => item !== historyItems[i]))
    historyItems[i] = { ...historyItems[i], ...data, show: false }
    this.setState({ historyItems: [...historyrender] })
  }

  formatDate(timestamp) {
    let date = new Date(timestamp)

    return <p>{date.getHours() + ":" + date.getMinutes()}<br />{date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()}</p>
  }

  filterOrders(orders) {
    let filteredOrders = orders
      .filter(x => new RegExp(this.props.data.room, 'i').test(x.room_number))
      .filter(x => new RegExp(this.props.data.device_imei, 'i').test(x.device_imei))
      .filter(x => new RegExp(this.props.data.tourist, 'i').test(x.tourist.name))
      .filter(x => new RegExp(this.props.data.status, 'i').test(x.status))
      .filter(x => new RegExp(this.props.data.reservation, 'i').test(x.reservation))



    if (this.props.data.start_date)
      filteredOrders = filteredOrders.filter(x => { console.log(x.created_at,"create"); return x.created_at > this.props.data.start_date })
    if (this.props.data.end_date)
      filteredOrders = filteredOrders.filter(x => x.created_at < this.props.data.end_date)
    return filteredOrders;
  }

  toggle(i) {
    let orders = this.state.historyItems.map((x, j) => {
      if (i == j) return { ...x }
      return { ...x, show: false }
    });
    orders[i].show = !orders[i].show;
    this.setState({ historyItems: [...orders] })
  }

  componentDidCatch() {
    this.setState({ historyItems: [] })
  }

  render() {
    var show = this.state.historyItems.filter(user => user.id == this.context.id)
    console.log(this.state.historyItems, "historyItems i'am 2")

  


    return <div className="history-items">
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Tourist</th>
            <th>Status</th>
            <th>Delay</th>
            <th>Price</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          {this.filterOrders(this.context.id == 0 ? this.state.historyItems : show).map((x, i) => <tr>
            <td>{x.post.title} {x.qt > 1 ? "(x" + x.qt + ")" : ""}</td>
            <td>{x.tourist.name}</td>
            <td className="status">{this.renderStatus(x.status)}</td>
            <td>{x.delay || '- -'}</td>
            <td>{(x.post.price * (100 - x.post.price_promo) / 100) * x.qt}<sup>TND</sup></td>
            <td>{this.formatDate(x.created_at * 1000)}</td>
            <td className="relative">
              <div className={x.show ? "popover" : "popover hidden"}>
                <OrderPopover order={x} update={(data) => this.update(i, data)} />
              </div>
              <img onClick={() => this.toggle(i)} src="/img/ui/menu.svg" />
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>;
  }
}
OrderReservationContainer.contextType = NotifContext
export default OrderReservationContainer;
