import React, { Component } from 'react';
import './PricePage.scss'

class PricePage extends Component {
  constructor(props) {

    super(props)
    this.state = { data: { ...this.props.data } }
  }

  handleChange(e) {
    this.props.setData({
      price: e.target.value
    });
  }

  handleChangePromo(e1) {
    this.props.setData({
      price_promo: e1.target.value
    });
  }

  handleChangeRating(e) {
    this.props.setData({
      rate: e.target.value
    });
  }

  render() {
    return <>
      <div className="form-grouping-half">
        <label className="input-label-full">Price</label>
        <input type="number" value={this.props.data.price} placeholder="Price in TND" onChange={this.handleChange.bind(this)} className="input-full" />
        <label className="input-label-full">Promo (in %)</label>
        <input type="number" value={this.props.data.price_promo} placeholder="Optional" onChange={this.handleChangePromo.bind(this)} className="input-full" />
        <label className="input-label-full">Star rating</label>
        <input
          type="number"
          required
          placeholder="Star rating"
          onChange={this.handleChangeRating.bind(this)}
          className="input-label-full" />
      </div>
    </>;
  }
}

export default PricePage;
