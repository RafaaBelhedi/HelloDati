import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import "./EmployeeCard.scss"
import ReactSVG from 'react-svg';
import Popup from "reactjs-popup";

class EmployeeCard extends Component {

  render() {
    return <div className="employee-card">
      <div className="employee-details">
        <div className="image"><img src="/img/ui/employes.png" alt="logo employee" /></div>
        <p>{this.props.data.name}</p>
      </div>
      <div className="employee-button">
        <div className="employee-redirect">

          <Link to={"/emlpoyee/edit/" + this.props.data.id}>
            <button className="edit_butt">
              <div className="edit_image"><img src="/img/ui/modifier.png" alt="edit logo" /></div>

              <div className="text">Edit</div>

            </button>
          </Link>
        </div>
        <Popup trigger={<div ><img src="/img/ui/supprimer.png" /></div>} modal>

          {close => (


             
              <div className="actions">
              <p className="header"  style={{marginBottom:"15px"}}> Are you sure to delete this employee ? </p>
              <div className="button_actions">
                <img src="/img/ui/btn_valider.png" onClick={() => { close(); this.props.onDelete(this.props.data.id, this.props.data.hotel_id) }} />
                <img src="/img/ui/btn_annuler.png" onClick={() => { close(); }} />
              </div>
              </div>
          )}

        </Popup>
      </div>
    </div>
  }
}

export default EmployeeCard;
