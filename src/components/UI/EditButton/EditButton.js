import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import "./EditButton.scss"

class EditButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Link to={'/' + this.props.link + '/edit/' + this.props.id}><img src="/img/ui/edit_button.png" /></Link>;
  }
}

export default EditButton;
