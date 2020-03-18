import React, { Component } from 'react';
import "./Presentation.scss"
import ReactSVG from "react-svg"
import { callApi } from '../../Helpers';
import { Doughnut } from 'react-chartjs-2';
import { UserContext } from '../Context'
class Presentation extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      devices: [],
      orders: [],
      topOrders: [],
      topReservations: []
    }
  }

  async componentDidMount() {
    let devices = await callApi('devices')
    this.setState({ devices: devices.data })
    let orders = await callApi('shopping_orders');
    this.setState({ orders: orders.data });


    let topOrders = await callApi('posts/top/orders', { 'hotel_id': this.context.hotel_id[0] }, 'GET');
    this.setState({ topOrders: topOrders.data });

    let topReservations = await callApi('posts/top/reservations', { 'hotel_id': this.context.hotel_id[0] }, 'GET');
    this.setState({ topReservations: topReservations.data });


  }

  render() {
    const orders = this.state.orders.filter(x => (x.reservation == 0) && (x.status != 0))
    const reservations = this.state.orders.filter(x => x.reservation == 1 && x.status != 0)
    return <div className="presentation-container">
      <div className="mobiles">
        <div className="mobile">
          {/* <ReactSVG src="/img/ui/eteint.svg" /> */}
          <div>
            <img src="/img/ui/eteint.png" className="image-eteint" />
          </div>
          <div>
            <p className="number">{this.state.devices.filter(x => x.status == 0).length}</p>
            <p className="text">Inactive Mobiles</p>
          </div>
        </div>

        <div className="mobile">
          {/* <ReactSVG src="/img/ui/active.svg" /> */}
          <div>
            <img src="/img/ui/active.png" className="image-eteint" />
          </div>
          <div>
            <p className="number">{this.state.devices.filter(x => x.status == 1).length}</p>
            <p className="text">Active Mobiles</p>
          </div>
        </div>

        <div className="mobile">
          {/* <ReactSVG src="/img/ui/chambre.svg" /> */}
          <div>
            <img src="/img/ui/totalmobile.png" className="image-eteint" />
          </div>
          <div>
            <p className="number">{this.state.devices.length}</p>
            <p className="text">Total Mobiles</p>
          </div>
        </div>
      </div>
      <div className="commands">
        <div className="command">
          <div>
            <p className="number">{orders.length}</p>
            <p className="text">Total Orders</p>
          </div>
          <div className="stat">
            <p className="percentage">{Math.round(orders.filter(x => x.status == 1).length / orders.length * 100) || 0}%</p>
            <div><Doughnut
              height="100"
              width="110"

              data={{
                labels: [
                  'Waiting',
                  'Total',
                ],
                datasets: [{
                  data: [orders.filter(x => x.status == 1).length, orders.length],
                  backgroundColor: [
                    '#FDCDA3',
                    '#111F35',
                  ],
                  borderWidth: [
                    0, 0
                  ],
                }]
              }}
              options={{
                legend: { display: false },
                cutoutPercentage: 80,
                responsive: true,
                maintainAspectRatio: false
              }
              }
            /></div>
            <p style={{ color: "#FDCDA3" }}>Waiting</p>
          </div>
          <div className="stat">
            <p className="percentage">{Math.round(orders.filter(x => x.status == 2).length / orders.length * 100) || 0}%</p>
            <div><Doughnut
              height="100"
              width="110"

              data={{
                labels: [
                  'Accepted',
                  'Total',
                ],
                datasets: [{
                  data: [orders.filter(x => x.status == 2).length, orders.length],
                  backgroundColor: [
                    '#879CBF',
                    '#111F35',
                  ],
                  borderWidth: [
                    0, 0
                  ],
                }]
              }}
              options={{
                legend: { display: false },
                cutoutPercentage: 80,
                responsive: true,
                maintainAspectRatio: false
              }
              }
            /></div>
            <p style={{ color: "#879CBF" }}>Accepted</p>
          </div>
          <div className="stat">
            <p className="percentage">{Math.round(orders.filter(x => x.status == 4).length / orders.length * 100) || 0}%</p>
            <div><Doughnut
              height="100"
              width="110"

              data={{
                labels: [
                  'Delivered',
                  'Total',
                ],
                datasets: [{
                  data: [orders.filter(x => x.status == 4).length, orders.length],
                  backgroundColor: [
                    '#86C7CC',
                    '#111F35',
                  ],
                  borderWidth: [
                    0, 0
                  ],
                }]
              }}
              options={{
                legend: { display: false },
                cutoutPercentage: 80,
                responsive: true,
                maintainAspectRatio: false
              }
              }
            /></div>
            <p style={{ color: "#86C7CC" }}>Delivered</p>
          </div>
          <div className="stat">
            <p className="percentage">{Math.round(orders.filter(x => x.status == 3).length / orders.length * 100) || 0}%</p>
            <div><Doughnut
              height="100"
              width="110"

              data={{
                labels: [
                  'Rejected',
                  'Total',
                ],
                datasets: [{
                  data: [orders.filter(x => x.status == 3).length, orders.length],
                  backgroundColor: [
                    '#CF6E6E',
                    '#111F35',
                  ],
                  borderWidth: [
                    0, 0
                  ],
                }]
              }}
              options={{
                legend: { display: false },
                cutoutPercentage: 80,
                responsive: true,
                maintainAspectRatio: false
              }
              }
            /></div>
            <p style={{ color: "#CF6E6E" }}>Rejected</p>
          </div>
        </div>
        <div className="command">
          <div>
            <p className="number">{reservations.length}</p>
            <p className="text">Total reservations</p>
          </div>
          <div className="stat">
            <p className="percentage">{Math.round(reservations.filter(x => x.status == 1).length / reservations.length * 100) || 0}%</p>
            <div><Doughnut
              height="100"
              width="110"

              data={{
                labels: [
                  'Waiting',
                  'Total',
                ],
                datasets: [{
                  data: [reservations.filter(x => x.status == 1).length, reservations.length],
                  backgroundColor: [
                    '#FDCDA3',
                    '#111F35',
                  ],
                  borderWidth: [
                    0, 0
                  ],
                }]
              }}
              options={{
                legend: { display: false },
                cutoutPercentage: 80,
                responsive: true,
                maintainAspectRatio: false
              }
              }
            /></div>
            <p style={{ color: "#FDCDA3" }}>Waiting</p>
          </div>
          <div className="stat">
            <p className="percentage">{Math.round(reservations.filter(x => x.status == 2).length / reservations.length * 100) | 0}%</p>
            <div><Doughnut
              height="100"
              width="110"

              data={{
                labels: [
                  'Accepted',
                  'Total',
                ],
                datasets: [{
                  data: [reservations.filter(x => x.status == 2).length, reservations.length],
                  backgroundColor: [
                    '#879CBF',
                    '#111F35',
                  ],
                  borderWidth: [
                    0, 0
                  ],
                }]
              }}
              options={{
                legend: { display: false },
                cutoutPercentage: 80,
                responsive: true,
                maintainAspectRatio: false
              }
              }
            /></div>
            <p style={{ color: "#879CBF" }}>Accepted</p>
          </div>
          <div className="stat">
            <p className="percentage">{Math.round(reservations.filter(x => x.status == 4).length / reservations.length * 100) | 0}%</p>
            <div><Doughnut
              height="100"
              width="110"

              data={{
                labels: [
                  'Delivered',
                  'Total',
                ],
                datasets: [{
                  data: [reservations.filter(x => x.status == 4).length, reservations.length],
                  backgroundColor: [
                    '#86C7CC',
                    '#111F35',
                  ],
                  borderWidth: [
                    0, 0
                  ],
                }]
              }}
              options={{
                legend: { display: false },
                cutoutPercentage: 80,
                responsive: true,
                maintainAspectRatio: false
              }
              }
            /></div>
            <p style={{ color: "#86C7CC" }}>Delivered</p>
          </div>
          <div className="stat">
            <p className="percentage">{Math.round(reservations.filter(x => x.status == 3).length / reservations.length * 100) | 0}%</p>
            <div><Doughnut
              height="100"
              width="110"

              data={{
                labels: [
                  'Rejected',
                  'Total',
                ],
                datasets: [{
                  data: [reservations.filter(x => x.status == 3).length, reservations.length],
                  backgroundColor: [
                    '#CF6E6E',
                    '#111F35',
                  ],
                  borderWidth: [
                    0, 0
                  ],
                }]
              }}
              options={{
                legend: { display: false },
                cutoutPercentage: 80,
                responsive: true,
                maintainAspectRatio: false
              }
              }
            /></div>
            <p style={{ color: "#CF6E6E" }}>Rejected</p>
          </div>
        </div>
      </div>
      <div className="top">
        <div className="stats order">
          <table>
            <thead>
              <th><td>Top orders</td></th>
              {this.state.topOrders.length > 0 ? this.state.topOrders.map((order, i) => <tr><td>{i + 1 + '. ' + order.title}</td></tr>)
                :
                <tr><td><center>There are no dishes or drinks ordered</center></td></tr>
              }
            </thead>
            <tbody>




            </tbody>
          </table>
        </div>
        <div className="stats reservation">
          <table>
            <thead>
              <th><td style={{ color: '#ffffff' }}>Top reservations</td></th>
            </thead>
            <tbody>
              {this.state.topReservations.length > 0 ? this.state.topReservations.map((reservation, i) => <tr><td>{i + 1 + '. ' + reservation.title}</td></tr>)
                :
                <tr><td style={{ backgroundColor: '#E3E3E3' }}><center>There are no reservations yet</center></td></tr>
              }

            </tbody>
          </table>
        </div>
      </div>
    </div>;
  }
}
Presentation.contextType = UserContext

export default Presentation;

