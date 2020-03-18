import React, { Component } from 'react';
import './PreviewModel.scss'
import { callApi, callApiWithBody } from '../../../Helpers';

class PreviewModel extends Component {


  render() {
    return (
      <div className="preview_container">
        <p>Preview</p>
        <div className="phone"><img src="/img/ui/c15pro.png" alt="phone_photo" /></div>
      </div>

    );
  }
}

export default PreviewModel;
