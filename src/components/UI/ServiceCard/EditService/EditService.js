import React, { Component } from 'react';
import { callApi , callApiWithBody} from '../../../../Helpers';
import { UserContext } from '../../../Context'
import Modal from 'react-awesome-modal';


class EditService extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {

    }

  }




  render() {

    return <div className="title-service-edit">    
                            
							<Modal
								className="title-service-edit-one"
                visible={this.props.visible}
								width="400"
               height="200"
								effect="fadeInUp"
								onClickAway={() => this.props.closeModal()}
							>
					 			<div className="edit-Service-title">
                                     <p>hiiii</p>
                                     <div>bonjour</div>

								</div>
							</Modal>
						    
 
    </div>;
  }
}
EditService.contextType = UserContext

export default EditService;
  