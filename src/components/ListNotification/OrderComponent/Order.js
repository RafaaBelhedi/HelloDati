import React, { Component } from 'react';
import ReactSVG from 'react-svg'
import './Ordes.scss'
import { NotifContext } from '../../Context'

class Order extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: 'white'
    }

  }
  componentDidMount() {
    if (this.props.reser.seen == 0) {
      this.setState({ color: '#edf2fa' })
    }
  }

  // direction(){
  //   return new Promise((resolve,reject)=>{
  //     if(this.context.id !== 0){
  //     resolve( 'success' )
  //     }else{
  //       reject('failed')
  //     }
  //   })
  // }

  render() {
    let unix_timestamp = this.props.reser.reservation_time;
    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    // direction().then((message)=>{console.log()})

    return <div className="oreder-container" style={{ background: this.state.color }} onClick={() => { this.context.setId(this.props.reser.id); this.props.direction('/orders'); sessionStorage.setItem('idNotif', this.props.reser.id); this.props.isSeen(this.props.reser.id); }} key={this.props.reser.id} >
      <div className="logo-container">
        {/* <ReactSVG  src="/img/header/commande.svg"/> */}
        <img src="/img/header/commande.png" style={{ height: "32px", width: "32px" }} />
      </div>
      <div className="details-container">
        <div className="tourist-name">{this.props.reser.tourist_full_name}</div>
        <div className="type-order"> {this.props.reser.post.title}<span style={{ color: "red" }}>{this.props.reser.qt > 1 ? "(x" + this.props.reser.qt + ")" : ""}</span></div>

      </div>
      <div className="time-container"> {formattedTime} </div>
    </div>
  }






}
Order.contextType = NotifContext
export default Order;