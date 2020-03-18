import React, { Component } from 'react';
import './AddTouristSection.scss'


class AddTouristUn extends Component {
  constructor(props) {
    super(props)
    this.state = { tourist: this.props.tourist }

  }


  render() {
    return <>

      <div className="form-grouping-half-tourist-add">


        <select name="prefix_name" onChange={(e) => this.props.setData({ prefix_name: e.target.value })} className="input-half-tourist-add">
          <option selected disabled hidden>prefix</option>
          <option value="0">Mr.</option>
          <option value="1">Ms.</option>
          <option value="2">Miss.</option>
          <option value="3">Mrs.</option>
        </select>

        <input
          type="text"
          required
          placeholder="first_name"
          value={this.props.tourist.first_name || ''}
          onChange={(e) => this.props.setData({ first_name: e.target.value })}
          className="input-half-tourist-add" />


        <input
          type="text"
          required
          placeholder="last_name"
          value={this.props.tourist.last_name || ''}
          onChange={(e) => this.props.setData({ last_name: e.target.value })}
          className="input-half-tourist-add" />


        <select name="gender" onChange={(e) => this.props.setData({ gender: e.target.value })} className="input-half-tourist-add" >
          <option selected disabled hidden>Gender</option>
          <option value="2">Female</option>
          <option value="1">Male</option>
          <option value="0">Other</option>
        </select>





      </div>
    </>;
  }
}

export default AddTouristUn;
