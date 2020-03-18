import React, { Component } from 'react';
import './AddButton.scss'
import { Link } from 'react-router-dom'

class AddButton extends Component {
  render() {
    return <button className="add-button" style={this.props.style}>
      <Link to={'/add/' + this.props.link + '/' + this.props.id}>
        {this.props.children}
      </Link>
    </button>;
  }
}
export default AddButton;
