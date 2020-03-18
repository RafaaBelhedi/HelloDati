import React, { Component } from 'react';
import "./FormPage.scss"
import SwitchNoApi from '../SwitchNoApi'

class FormPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      accept_reservation: 1,
      accept_order: 1,
    }

  }

  render() {
    console.log(this.props.id, "formpage")
    return <div className="form-page">
      <div className="form-header">{this.props.title || 'Default'}</div>
      <div className="form-elements">{this.props.children}</div>

    </div>;
  }
}

export default FormPage;
