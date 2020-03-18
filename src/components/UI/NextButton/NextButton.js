import React, { Component } from 'react';
import './NextButton.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

class NextButton extends Component {
  render() {
    return <button className="navigation-button" onClick={this.props.increment}>
      {this.props.children}
      <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
    </button>;
  }
}

export default NextButton;
