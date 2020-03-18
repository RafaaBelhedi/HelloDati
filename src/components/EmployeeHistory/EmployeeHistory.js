import React, { Component } from 'react';
import './EmployeeHistory.scss'
import { callApi } from '../../Helpers';
import { UserContext } from '../Context'
import ReactSVG from 'react-svg';

class EmployeeHistory extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      role: 2,
      approved: 1,
      hotel_id: this.context.hotel_id[0],
      employee: {},
      logs:[],
    }
    this.edit = this.edit.bind(this)
  }


  async componentDidMount() {
    let x = await callApi('logs',{user_id:this.props.match.params.id})
    this.setState({ logs: x.data })
    }

  async edit() {
    let x = await callApi('user/'+this.props.match.params.id,
      {
        ...this.state
      },
      'PUT')
    //  console.log(this.state,"state up date")
    //  console.log(this.state.first_name,"is the new first name")
    if (x.data)
      window.location.href = "/employees"
    else
      alert("There has been an error please try again")
  }
  render() {

    return <div className='employee-form-add'>

      <div className="employee-header">

        <div className="employee-header_title">Employee Log</div>

      </div>

      <div className="employee-inputs">
        <table>
          <thead>
            <tr>
              <th>Log</th>
            </tr>
          </thead>
          <tbody>
            {this.state.logs.map(x=>
              <tr>
                <td>{x.text+" on "+new Date(x.created_at*1000)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>;
  }

}

EmployeeHistory.contextType = UserContext

export default EmployeeHistory;
