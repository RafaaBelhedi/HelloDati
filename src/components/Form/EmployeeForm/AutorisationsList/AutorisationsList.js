import React, { Component } from 'react';
import './AutorisationsList.scss'
import { UserContext } from '../../../Context';
import { callApi } from '../../../../Helpers';

class AutorisationsList extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            services: []
        }
    }
    async componentDidMount() {
        let post = await callApi("posts", {
            hotel_id: this.context.hotel_id[0],
            parent_id: null
        });
        let services = await callApi("posts", {
            hotel_id: this.context.hotel_id[0],
            parent_id: post.data[0].id
        });
        await this.setState({ services: services.data });
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
                        <td><input type="radio" name="guests" value={1} onClick={(e) => this.props.setData({ guests: e.target.value })} /></td>
                        <td><input type="radio" name="guests" value={0} onClick={(e) => this.props.setData({ guests: e.target.value })} /></td>

                    </tr>
                    <tr>
                        <td>Devices</td>
                        <td><input type="radio" name="devices" value={1} onClick={(e) => this.props.setData({ devices: e.target.value })} /></td>
                        <td><input type="radio" name="devices" value={0} onClick={(e) => this.props.setData({ devices: e.target.value })} /></td>

                    </tr>
                    <tr>
                        <td>Orders Reservations</td>
                        <td><input type="radio" name="orders_reservations" value={1} onClick={(e) => this.props.setData({ orders_reservations: e.target.value })} /></td>
                        <td><input type="radio" name="orders_reservations" value={0} onClick={(e) => this.props.setData({ orders_reservations: e.target.value })} /></td>

                    </tr>

                    <tr>
                        <td>Rooms</td>
                        <td><input type="radio" name="rooms" value={1} onClick={(e) => this.props.setData({ rooms: e.target.value })} /></td>
                        <td><input type="radio" name="rooms" value={0} onClick={(e) => this.props.setData({ rooms: e.target.value })} /></td>

                    </tr>
                    <tr>
                        <td>Employees</td>
                        <td><input type="radio" name="employees" value={1} onClick={(e) => this.props.setData({ employees: e.target.value })} /></td>
                        <td><input type="radio" name="employees" value={0} onClick={(e) => this.props.setData({ employees: e.target.value })} /></td>

                    </tr>
                    <tr>
                        <td>Notifications</td>
                        <td><input type="radio" name="notifications" value={1} onClick={(e) => this.props.setData({ notifications: e.target.value })} /></td>
                        <td><input type="radio" name="notifications" value={0} onClick={(e) => this.props.setData({ notifications: e.target.value })} /></td>

                    </tr>
                    <tr>
                        <td>Chat</td>
                        <td><input type="radio" name="chat" value={1} onClick={(e) => this.props.setData({ chat: e.target.value })} /></td>
                        <td><input type="radio" name="chat" value={0} onClick={(e) => this.props.setData({ chat: e.target.value })} /></td>

                    </tr>
                    <tr>
                        <td>History</td>
                        <td><input type="radio" name="history" value={1} onClick={(e) => this.props.setData({ history: e.target.value })} /></td>
                        <td><input type="radio" name="history" value={0} onClick={(e) => this.props.setData({ history: e.target.value })} /></td>

                    </tr>
                    <tr>
                        <td>Statistics</td>
                        <td><input type="radio" name="statistics" value={1} onClick={(e) => this.props.setData({ statistics: e.target.value })} /></td>
                        <td><input type="radio" name="statistics" value={0} onClick={(e) => this.props.setData({ statistics: e.target.value })} /></td>
                    </tr>
                    {
                        this.state.services.map((service, i) => {
                            return (
                                <tr>
                                    <td>{service.title}</td>
                                    <td><input type="radio" name={service.title} value={1} onClick={(e) => this.props.setPostAccessData(service.id, e.target.value)} /></td>
                                    <td><input type="radio" name={service.title} value={0} onClick={(e) => this.props.setPostAccessData(service.id, e.target.value)} /></td>
                                </tr>
                            )
                        })
                    }


                </tbody>
            </table>
        </div>;
    }
}

AutorisationsList.contextType = UserContext

export default AutorisationsList;
