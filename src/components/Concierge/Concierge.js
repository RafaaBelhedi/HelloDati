import React, { Component } from 'react';
import './Concierge.scss'
import ConciergeSearch from './ConciergeSearch/ConciergeSearch'
import ConciergeContainer from './ConciergeContainer/ConciergeContainer'
import { NotifContext } from '../Context'
import { UserContext } from '../Context'

class Concierge extends Component {
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
       
            <ConciergeSearch update={this.setData} data={this.state.data} />
       


            <ConciergeContainer data={this.state.data}  />


      </section>
    </div>;
  }
}


export default Concierge;
