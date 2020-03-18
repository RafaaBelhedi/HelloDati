import React, { Component } from 'react';
import '../DishUpdateFormNew.scss'

import Modal from 'react-awesome-modal';

class AddFrInputs extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
   
    }

  }


 

  render() {

    return <div className="form-grid-here">
          
							<Modal
								className="my-modal-restau"
								visible={this.props.valuefr}
								width="400"
								height="450"
								effect="fadeInUp"
								onClickAway={() => this.props.closeModalFr()}
							>
					 			<div className="add-modal">
					
						<div className="mainrest-container-fr">
            <label>Titre* :</label>
            <input    placeholder="Title"  value={this.props.tradfr.title} onChange={(e) => this.props.setDataFr({ title: e.target.value })}  />
            <label>Description* :</label>
             <textarea   placeholder="Description" value={this.props.tradfr.description} onChange={(e) => this.props.setDataFr({ description: e.target.value })}  />
            </div>
            	<div className="button-container">
              <div className="bt-valide" onClick={() => {this.props.sendFr();this.props.closeModalFr()}}>
              <img src="/img/ui/valideWhite.png" style={{ width: "16px", height: "16px" }} />
                <p>Ajouter</p>
            </div></div>
								</div>
							</Modal>
					

    </div>;
  }
}

export default AddFrInputs;
  