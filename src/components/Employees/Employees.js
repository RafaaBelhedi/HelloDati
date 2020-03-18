import React, { Component } from 'react';

import { callApi } from '../../Helpers';
import { UserContext } from '../Context';
import './Employees.scss'
import { Link } from 'react-router-dom'
import EmployeeCard from '../UI/EmployeeCard';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

class Employees extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      employees: [],
    }
    this.updateTheState = this.updateTheState.bind(this);
  }

  async componentDidMount() {
    let employees = await callApi('users', { 'hotel_id': this.context.hotel_id[0] });
    this.setState({ employees: employees.data });
  }
  async updateTheState(id, hotelId) {
    let result = await callApi('user/' + id, {}, 'DELETE');
    let employees = await callApi('users', { 'hotel_id': this.context.hotel_id[0] });
    this.setState({ employees: employees.data });
    let parameters = {
      title: "Success",
      message: "The employee has been successfully deleted",
      type: "success",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 4000,
        onScreen: false
      }
    }
    if (result === 0) {
      parameters['type'] = "danger";
      parameters['title'] = "Error";
      parameters['message'] = "You can't delete this employee";
    }

    store.addNotification(parameters);
  }

  render() {
    console.log(this.state.employees,"testffggff")
    
    return <>
      <ReactNotification />
      <div className="employees-container">
        <div className='employee-search'>
          <label>Search Employees</label>
          <input placeholder='Name...' onChange={(e) => this.setState({ name: e.target.value })} />
        </div>
        <Link to="/add/employee"><div className="emp-butt"><img src="/img/ui/ajouter_employes.png" alt="img" />Add employee</div></Link>

        {this.state.employees
          .filter(x => new RegExp(this.state.name, 'i').test(x.name))
          .map(x => <EmployeeCard data={x} onDelete={this.updateTheState}></EmployeeCard>)
        }
      </div></>;
  }
}

Employees.contextType = UserContext

export default Employees;
