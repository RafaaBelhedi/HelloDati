import React, { Component } from 'react';
import { callApi } from '../../../Helpers';
import HistoryItem from '../../UI/HistoryItem'
import OrderPopover from "../../UI/OrderPopover"
import './ConciergeContainer.scss';
import { UserContext } from '../../Context';


class ConciergeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requests: [],
      color: ""
    }
    // this.toggle = this.toggle.bind(this)
    // this.update = this.update.bind(this)
  }

  // async componentDidMount() {
  //   let requests = await callApi('posts', { hotel_id: this.context.hotel_id[0] , parent_id:this.props.service.id })
  // this.setState({ requests: requests.data})
  //   console.log(requests, "lalalahistory")
  //   this.update();
  // }

  componentWillUnmount() {
  }

  renderStatus(concierge_state) {
    switch (concierge_state) {
      case 1:
        return <><span style={{ backgroundColor: "#F0B17A" }}></span><p>Waiting</p></>
      case 2:
        return <><span style={{ backgroundColor: "#879CBF" }}></span><p>Accepted</p></>
      case 3:
        return <><span style={{ backgroundColor: "#CF6E6E" }}></span><p>Rejected</p></>
    }
  }

  update(i, data) {
    console.log(data, "rafaa")
    let requests = [...this.state.requests]
    console.log(requests, "rafaa kol")
    let historyrender = requests.filter((item => item !== requests[i]))
    console.log(historyrender, "rafaa a9al")
    requests[i] = { ...requests[i], ...data, show: false }
    console.log(requests[i], "rafaa")
    console.log(i, "rafaa")


    this.setState({ requests: [...historyrender] })
  }

  formatDate(timestamp) {
    let date = new Date(timestamp)

    return <p>{date.getHours() + ":" + date.getMinutes()}<br />{date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()}</p>
  }

  // filterOrders(orders) {
  //   let filteredOrders = orders
  //     .filter(x => new RegExp(this.props.data.room, 'i').test(x.room_number))
  //     .filter(x => new RegExp(this.props.data.device_imei, 'i').test(x.device_imei))
  //     .filter(x => new RegExp(this.props.data.tourist, 'i').test(x.tourist.name))
  //     .filter(x => new RegExp(this.props.data.status, 'i').test(x.status))
  //     .filter(x => new RegExp(this.props.data.reservation, 'i').test(x.reservation))



  //   if (this.props.data.start_date)
  //     filteredOrders = filteredOrders.filter(x => { console.log(x.created_at); return x.created_at > this.props.data.start_date })
  //   if (this.props.data.end_date)
  //     filteredOrders = filteredOrders.filter(x => x.created_at < this.props.data.end_date)
  //   return filteredOrders;
  // }

  // toggle(i) {
  //   let orders = this.state.requests.map((x, j) => {
  //     if (i == j) return { ...x }
  //     return { ...x, show: false }
  //   });
  //   orders[i].show = !orders[i].show;
  //   this.setState({ requests: [...orders] })
  // }

  // componentDidCatch() {
  //   this.setState({ requests: [] })
  // }

  render() {
    console.log(this.props.service,"service")

    return <div className="history-items">
      <table>
        <thead>
          <tr>
            <th>Type</th>
            {/* <th>Tourist</th> */}
            <th>Status</th>
            {/* <th>Delay</th> */}
            <th>Comment</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

         {this.state.requests.map((x, i) => <tr>
           <td>{x.concierge_type == 0 && "House Kepping" ||x.concierge_type == 1 && "Maintenance"} </td>
            {/* <td>{x.post.title} {x.qt > 1 ? "(x" + x.qt + ")" : ""}</td> */}
            {/* <td>{x.tourist.name}</td> */}
            <td className="status">{this.renderStatus(x.concierge_state)}</td>
            {/* <td>{x.delay || '- -'}</td> */}
         <td>{x.comment_reason}</td>
            <td>{this.formatDate(x.created_at * 1000)}</td>
           <td><div className="accpet_button">Accept</div></td>
          </tr>)}
        </tbody>
      </table>
    </div>;
  }
}
ConciergeContainer.contextType = UserContext
export default ConciergeContainer;
