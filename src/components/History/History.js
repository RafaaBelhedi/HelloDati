import React, { Component } from 'react';
import './History.scss'
import HistorySearch from '../Form/HistorySearch'
import HistoryContainer from '../History/HistoryContainer'
import { NotifContext } from '../Context'
import { UserContext } from '../Context'

class History extends Component {
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
    return <div className="history-container">
      <section className="history">
        <NotifContext.Consumer>
          {context => (
            <HistorySearch update={this.setData} data={this.state.data} />
          )}
        </NotifContext.Consumer>
        <NotifContext.Consumer>
          {context => (
            <HistoryContainer data={this.state.data} context={this.context.hotel_id[0]} />
          )}
        </NotifContext.Consumer>
      </section>
    </div>;
  }
}
History.contextType = UserContext

export default History;
