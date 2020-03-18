import React, { Component } from 'react';
import './AddButton.scss'
import {Link} from 'react-router-dom'

class AddButton extends Component {
  render() {
    console.log(this.props.services,"servicesservices")
    return <button className="addButton" style={this.props.style}>
      <Link to="/addService">
      {this.props.children}
      </Link>
      </button>;
  }
}

export default AddButton;
