import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

class BackButton extends Component {
  render() {
    return <button className="navigation-button" onClick={this.props.decrement}>
      <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
      Back
  </button>;
  }
}

export default BackButton;
