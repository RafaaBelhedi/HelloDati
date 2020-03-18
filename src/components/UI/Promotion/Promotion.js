import React, { Component } from 'react';
import './Promotion.scss'
import SwitchPromotion from '../../Form/RestaurantForm/SwitchPromotion/SwitchPromotion'
import TimeField from 'react-simple-timefield';

class Promotion extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return <>

      <div className="Promotion-container" >
        <div className="promotion-title">
          <div className="promotion-title-icon">
            <img src="/img/ui/promo.png" />
            <p>Promotion </p>
          </div>
          <SwitchPromotion checkP={this.props.checkP} setCheckPro={this.props.setCheckPro} />
        </div>
        <div className="Promotion-container-main">
          <div className="time-container-promo">

            <div className="time">
              <img src="/img/ui/clock.png" />
              <TimeField onChange={(e) => this.props.setData({ promo_start_hour: e.target.value })} value={this.props.data.promo_start_hour} />
            </div>

            <div className="date">
              <img src="/img/ui/agenda.png" />
              <input type="date" style={{ borderRight: "1px solid black" }} onChange={(e) => this.props.setData({ promo_start_date: e.target.value })} value={this.props.data.promo_start_date} />
            </div >

            {/* <div className="to">
          <p>To</p>
          </div> */}

            <div className="time">
              <img src="/img/ui/clock.png" />
              <TimeField onChange={(e) => this.props.setData({ promo_end_hour: e.target.value })} value={this.props.data.promo_end_hour} />
            </div>

            <div className="date">
              <img src="/img/ui/agenda.png" />
              <input type="date" onChange={(e) => this.props.setData({ promo_end_date: e.target.value })} value={this.props.data.promo_end_date} />
            </div >

          </div>
          <div className="value-container-promo">
            <div className="value-container-prix">
              <p>PRICE</p>
              <input placeholder="--,--" onChange={(e) => this.props.setData({ price: e.target.value })} value={this.props.data.price} />
              <p>DT</p>
            </div>
            <div className="promo-container-promo">
              <p>PROMO</p>
              <input placeholder="--%" onChange={(e) => this.props.setData({ price_promo: e.target.value })} value={this.props.data.price_promo} />
              <p>%</p>
            </div>
          </div>
        </div>
      </div>
    </>;
  }
}

export default Promotion;