import React, { Component } from 'react';
import './AddFormService.scss'
import { callApi } from '../../../Helpers';

class AddFormService extends Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = {
   

    }

  }

  async componentDidMount() {

  }

  render() {


    return <>

      <div className="add_service_container" >
<div  className="add_service_header">
FORMULAIRE D'AJOUT
</div>
<div className="add_service_main">
<div  className="details_service">

</div>
<div className="image_upload">

</div>
</div>
     
      </div>
    </>;
  }
}

export default AddFormService;