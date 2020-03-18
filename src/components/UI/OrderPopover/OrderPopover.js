import React, { Component } from 'react';
import "./OrderPopover.scss"
import ReactSVG from 'react-svg'
import { callApi } from '../../../Helpers';

class OrderPopover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: 0,
      minutes: 0,
      deny_text: "",
      noReason: false
    }

    this.accept = this.accept.bind(this)
    this.deny = this.deny.bind(this)

  }


  async accept() {
    let order;
    if (this.state.display == 1) {
      let order = await callApi('shopping_order/accept/dashboard/' + this.props.order.id, { delay: this.state.minutes }, 'POST');

      this.props.update({ ...order })
      this.setState({ display: 0 })
      return
    }

    this.setState({ display: 1 })
  }
  async deny() {

    if (this.state.display == 2) {
      await (this.state.deny_text)
      if (this.state.deny_text) {
        let order = await callApi('shopping_order/deny/' + this.props.order.id, { reason: this.state.deny_text }, 'POST')

        this.props.update({ ...order })
        this.setState({ display: 0 })
        return
      }
    } else { this.setState({ noReason: true }) }
    this.setState({ display: 2 })
  }

  componentWillUpdate(nextState) {
  }
  componentDidMount() {


  }

  render() {

    return <div className="order-popover">

      <div className="button-container">
        <div onClick={this.accept} className={"accept " + ((this.state.display === 1 || this.state.display === 0) && "expanded")}>
          <ReactSVG src="/img/ui/check-symbol.svg" />
          <p>Validate</p>
        </div>
        <div onClick={this.deny} className={"deny " + ((this.state.display === 2 || this.state.display === 0) && "expanded")}>
          <ReactSVG src="/img/ui/close.svg" />
          <p>Deny</p>
        </div>
      </div>
      {this.state.display === 1 ? (
        <div className="accept-container">
          <p>Confirm order</p>
          <ReactSVG onClick={() => this.setState({ minutes: this.state.minutes + 1 })} src="/img/ui/sort-up.svg" />
          <p style={{ marginLeft: '-4px' }}>{this.state.minutes ? this.state.minutes.toString().padStart(2, '0') : '- -'}</p>
          <ReactSVG onClick={() => this.setState({ minutes: Math.max(this.state.minutes - 1, 0) })} src="/img/ui/sort-down.svg" />
          <p>Delay in minutes</p>
        </div>

      ) : this.state.display === 2 ? (

        <div className="deny-container">
          {this.state.noReason == true ? " enter a reason to complete " : ""}
          <p>Deny Order</p>
          <textarea onInput={(e) => this.setState({ deny_text: e.target.value })}></textarea>
        </div>

      ) : null}
    </div>
  }
}

export default OrderPopover;
