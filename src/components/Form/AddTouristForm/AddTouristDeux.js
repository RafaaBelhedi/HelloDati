import React, { Component } from 'react';
import './AddTouristSection.scss'


class AddTouristDeux extends Component {
  constructor(props) {
    super(props)
    this.state = { tourist: this.props.tourist }
  }


  render() {
    return <>

      <div className="form-grouping-half-tourist-add">



        <input
          type="email"
          required
          placeholder="email@exemple.com"
          value={this.props.tourist.email || ''}
          onChange={(e) => this.props.setData({ email: e.target.value })}
          className="input-half-tourist-add" />


        <input
          type="date"
          required
          placeholder="YYYY-MM-DD"
          value={this.props.tourist.born || ''}
          onChange={(e) => this.props.setData({ born: e.target.value })}
          className="input-half-tourist-add" />


        <input
          type="number"
          required
          min="8"
          placeholder="phone_number"
          value={this.props.tourist.phone_number || ''}
          onChange={(e) => this.props.setData({ phone_number: e.target.value })}
          className="input-half-tourist-add" />


        <input
          type="number"
          required
          placeholder="cin_number"
          value={this.props.tourist.cin_number || ''}
          onChange={(e) => this.props.setData({ cin_number: e.target.value })}
          className="input-half-tourist-add" />






      </div>
    </>;
  }
}

export default AddTouristDeux;
