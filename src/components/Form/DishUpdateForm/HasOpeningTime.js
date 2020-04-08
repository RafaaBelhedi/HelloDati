import React, { Component } from 'react';
import { UserContext } from '../../Context'
import './DishUpdateFormNew.scss'
import OpenTimeModelEdit from './OpenTimeModelEdit'
import Switcher from '../../Form/RestaurantForm/Switch/Switcher'
import Modal from 'react-awesome-modal';


class DishUpdateFormNew extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      opening_time: this.props.data.opening_time,
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      visible: false,
      day: "Mon",
      data: this.props.data,
    }
    this.handleChange = this.handleChange.bind(this)

  }




  closeModal = () => {
    this.setState({
      visible: false
    });
  }

  async handleChange(e) {
    console.log('yrt')
    const target = e.target;
    const name = target.name;
    const value = target.value;


    await this.setState({
      opening_time: {
        ...this.state.opening_time,

        [this.state.day]: [['1', name == '0' ? value : this.state.opening_time[this.state.day][0][1], name == '1' ? value : this.state.opening_time[this.state.day][0][2]], (name == '2' || name == '3') ? ['1', name == '2' ? value : this.state.opening_time[this.state.day][1][1], name == '3' ? value : this.state.opening_time[this.state.day][1][2]] : ['0']]


      }
    });


    await this.props.setData({ opening_time: JSON.stringify(this.state.opening_time) })
  }
  componentDidMount() {
    console.log(JSON.stringify(this.props.opening_time["Mon"]), "opening_timenew")
  }

  render() {
    return <div className="has-opening-time-edit">
      {this.state.visible == true ?
        < OpenTimeModelEdit handleChange={this.handleChange} visible={this.state.visible} closeModal={this.closeModal} setData={this.props.setData} data={this.props.data} opening_time={this.state.opening_time} day={this.state.day} send={this.props.send} />

        : null}
      <div className="openSwitchEdit">
        <p>Opening Time</p>
        <Switcher check={this.props.check} setCheck={this.props.setCheck} />
      </div>
      <div className="container-days-op">
        <table>
          {this.props.days.map((y, i) => (
            <tr>
              <td> <p>{i == 0 ? "Monday" : ""} {i == 1 ? "Tuesday" : ""} {i == 2 ? "Wednesday" : ""}{i == 3 ? "Thursday" : ""}{i == 4 ? "Friday" : ""}{i == 5 ? "Saturday" : ""}{i == 6 ? "Sunday" : ""}: </p></td>
              <td className="middle-opening-time">  {this.state.opening_time[y] !== undefined && this.state.opening_time[y].map((x, i) => (
                <p style={{ color: "#1a3e64" }}> <span style={{ color: "#1a740e" }}>Shifts{i + 1}. </span>  Opening : &nbsp; {x[1] !== undefined ? x[1] : "-- : --" || "-- : --"} closing :&nbsp; {x[2] !== undefined ? x[2] : "-- : --" || "-- : --"}</p>
              ))}   </td>
              <td>    <img src="/img/ui/editTime.png" style={{ width: "16px", height: "16px" }} onClick={() => this.setState({ visible: true, day: y })} />  </td>
            </tr>
          ))}
        </table>
      </div>
    </div>;
  }
}
DishUpdateFormNew.contextType = UserContext

export default DishUpdateFormNew;
