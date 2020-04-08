import React, { Component } from 'react';
import './AutoristationEdit.scss'
import { UserContext } from '../../../Context';
import { callApi } from '../../../../Helpers';

class AutoristationEdit extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      services: [],
      sidebar_access: {},
      post_access: {}
    }
    this.handleSideBarAccess = this.handleSideBarAccess.bind(this);
    this.handlePostAccess = this.handlePostAccess.bind(this);
  }

  async componentDidMount() {
    let employee = await callApi('user/' + this.props.id);
    await this.setState({ post_access: employee.data[0].post_access });
    let post = await callApi("posts", {
      hotel_id: this.context.hotel_id[0],
      parent_id: null
    });
    let services = await callApi("posts", {
      hotel_id: this.context.hotel_id[0],
      parent_id: post.data[0].id
    });
    await this.setState({ services: services.data });
    await this.setState({ sidebar_access: employee.data[0].sidebar_access });
  }

  async handleSideBarAccess(newAccesses) {
    await this.setState({ sidebar_access: { ...this.state.sidebar_access, ...newAccesses } });
  }
  async handlePostAccess(index, value) {
    this.state.post_access[index].authorized = value;
    this.forceUpdate();
  }
  render() {
    return <div className='employee-autorisation'>

      <table>
        <thead>
          <tr>
            <th className="auto-th"> <img src="/img/ui/autorisation.png" style={{ width: "31px", height: "32px", marginRight: "15px", marginLeft: "15px" }} /> <p className="auto-title">LIST OF AUTHORIZATIONS</p></th>
            <th><img src="/img/ui/action.png" style={{ width: "16px", height: "16px" }} /></th>
            <th><img src="/img/ui/noaction.png" style={{ width: "16px", height: "16px" }} /></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Guests</td>
            <td><input type="radio" name="guests" value={1} onClick={(e) => this.props.setData({ guests: e.target.value })} checked={this.state.sidebar_access.guests == 1 && true} onChange={e => this.handleSideBarAccess({ guests: e.target.value })} /></td>
            <td><input type="radio" name="guests" value={0} onClick={(e) => this.props.setData({ guests: e.target.value })} checked={this.state.sidebar_access.guests == 0 && true} onChange={e => this.handleSideBarAccess({ guests: e.target.value })} /></td>

          </tr>
          <tr>
            <td>Devices</td>
            <td><input type="radio" name="devices" value={1} onClick={(e) => this.props.setData({ devices: e.target.value })} checked={this.state.sidebar_access.devices == 1 && true} onChange={e => this.handleSideBarAccess({ devices: e.target.value })} /></td>
            <td><input type="radio" name="devices" value={0} onClick={(e) => this.props.setData({ devices: e.target.value })} checked={this.state.sidebar_access.devices == 0 && true} onChange={e => this.handleSideBarAccess({ devices: e.target.value })} /></td>

          </tr>
          <tr>
            <td>Orders Reservations</td>
            <td><input type="radio" name="orders_reservations" value={1} onClick={(e) => this.props.setData({ orders_reservations: e.target.value })} checked={this.state.sidebar_access.orders_reservations == 1 && true} onChange={e => this.handleSideBarAccess({ orders_reservations: e.target.value })} /></td>
            <td><input type="radio" name="orders_reservations" value={0} onClick={(e) => this.props.setData({ orders_reservations: e.target.value })} checked={this.state.sidebar_access.orders_reservations == 0 && true} onChange={e => this.handleSideBarAccess({ orders_reservations: e.target.value })} /></td>

          </tr>

          <tr>
            <td>Rooms</td>
            <td><input type="radio" name="rooms" value={1} onClick={(e) => this.props.setData({ rooms: e.target.value })} checked={this.state.sidebar_access.rooms == 1 && true} onChange={e => this.handleSideBarAccess({ rooms: e.target.value })} /></td>
            <td><input type="radio" name="rooms" value={0} onClick={(e) => this.props.setData({ rooms: e.target.value })} checked={this.state.sidebar_access.rooms == 0 && true} onChange={e => this.handleSideBarAccess({ rooms: e.target.value })} /></td>

          </tr>
          <tr>
            <td>Employees</td>
            <td><input type="radio" name="employees" value={1} onClick={(e) => this.props.setData({ employees: e.target.value })} checked={this.state.sidebar_access.employees == 1 && true} onChange={e => this.handleSideBarAccess({ employees: e.target.value })} /></td>
            <td><input type="radio" name="employees" value={0} onClick={(e) => this.props.setData({ employees: e.target.value })} checked={this.state.sidebar_access.employees == 0 && true} onChange={e => this.handleSideBarAccess({ employees: e.target.value })} /></td>

          </tr>
          <tr>
            <td>Notifications</td>
            <td><input type="radio" name="notifications" value={1} onClick={(e) => this.props.setData({ notifications: e.target.value })} checked={this.state.sidebar_access.notifications == 1 && true} onChange={e => this.handleSideBarAccess({ notifications: e.target.value })} /></td>
            <td><input type="radio" name="notifications" value={0} onClick={(e) => this.props.setData({ notifications: e.target.value })} checked={this.state.sidebar_access.notifications == 0 && true} onChange={e => this.handleSideBarAccess({ notifications: e.target.value })} /></td>

          </tr>
          <tr>
            <td>Chat</td>
            <td><input type="radio" name="chat" value={1} onClick={(e) => this.props.setData({ chat: e.target.value })} checked={this.state.sidebar_access.chat == 1 && true} onChange={e => this.handleSideBarAccess({ chat: e.target.value })} /></td>
            <td><input type="radio" name="chat" value={0} onClick={(e) => this.props.setData({ chat: e.target.value })} checked={this.state.sidebar_access.chat == 0 && true} onChange={e => this.handleSideBarAccess({ chat: e.target.value })} /></td>

          </tr>
          <tr>
            <td>History</td>
            <td><input type="radio" name="history" value={1} onClick={(e) => this.props.setData({ history: e.target.value })} checked={this.state.sidebar_access.history == 1 && true} onChange={e => this.handleSideBarAccess({ history: e.target.value })} /></td>
            <td><input type="radio" name="history" value={0} onClick={(e) => this.props.setData({ history: e.target.value })} checked={this.state.sidebar_access.history == 0 && true} onChange={e => this.handleSideBarAccess({ history: e.target.value })} /></td>

          </tr>
          <tr>
            <td>Statistics</td>
            <td><input type="radio" name="statistics" value={1} onClick={(e) => this.props.setData({ statistics: e.target.value })} checked={this.state.sidebar_access.statistics == 1 && true} onChange={e => this.handleSideBarAccess({ statistics: e.target.value })} /></td>
            <td><input type="radio" name="statistics" value={0} onClick={(e) => this.props.setData({ statistics: e.target.value })} checked={this.state.sidebar_access.statistics == 0 && true} onChange={e => this.handleSideBarAccess({ statistics: e.target.value })} /></td>
          </tr>
          {
            this.state.services.map((service, i) => {

              return (
                <tr>
                  <td>{service.title}</td>
                  <td><input type="radio" name={service.title} value={1} onClick={(e) => this.props.setPostAccessData(service.id, e.target.value)} checked={this.state.post_access[i].authorized == 1 && true} onChange={e => this.handlePostAccess(i, e.target.value)} /></td>
                  <td><input type="radio" name={service.title} value={0} onClick={(e) => this.props.setPostAccessData(service.id, e.target.value)} checked={this.state.post_access[i].authorized == 0 && true} onChange={e => this.handlePostAccess(i, e.target.value)} /></td>
                </tr>
              )
            })
          }

        </tbody>
      </table>
    </div>;
  }
}

AutoristationEdit.contextType = UserContext

export default AutoristationEdit;
