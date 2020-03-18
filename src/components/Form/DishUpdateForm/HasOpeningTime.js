import React, { Component } from 'react';
import { callApi, callApiWithBody } from '../../../Helpers';
import { UserContext } from '../../Context'
import './DishUpdateFormNew.scss'
import TimeField from 'react-simple-timefield';
import OpenTimeModelEdit from './OpenTimeModelEdit'
import Switcher from '../../Form/RestaurantForm/Switch/Switcher'
import Modal from 'react-awesome-modal';


class DishUpdateFormNew extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      // opening_time: {
      //   "Mon": [["1", "08:00", "10:00"], ["1", "10:00", "11:11"]],
      //   "Tue": [["1", "09:00", "10:00"], ["1", "14:00", "18:00"]],
      //   "Wed": [["0"], ["0"]],
      //   "Thu": [["0"], ["0"]],
      //   "Fri": [["0"], ["0"]],
      //   "Sat": [["0"], ["0"]],
      //   "Sun": [["0"], ["0"]],
      // },
      // opening_time: {
        // "Mon": JSON.stringify(this.props.opening_time["Mon"]),
        // "Tue": JSON.stringify(this.props.opening_time["Tue"]),
        // "Wed": JSON.stringify(this.props.opening_time["Wed"]),
        // "Thu": JSON.stringify(this.props.opening_time["Thu"]),
        // "Fri": JSON.stringify(this.props.opening_time["Fri"]),
        // "Sat": JSON.stringify(this.props.opening_time["Sat"]),
        // "Sun": JSON.stringify(this.props.opening_time["Sun"]),
      // },
      opening_time:this.props.data.opening_time ,
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
  // setTime(time) {
  //   this.setState({ opening_time: { ...this.state.opening_time, ...time } })
  //   console.log(time,"dataopentime data")
  // }
  // async componentDidUpdate(prevProps) {
  //   if (this.props.data.opening_time !== prevProps.data.opening_time) {
     
  //      await this.setState({ opening_time: this.props.data.opening_time })
  
  //   }
  // }

  async handleChange(e) {
    console.log('yrt')
    const target = e.target;
    const name = target.name;
    const value = target.value;
 

   await this.setState({
      opening_time: {
        ...this.state.opening_time,
  
        [this.state.day]: [['1', name == '0' ? value : this.state.opening_time[this.state.day][0][1], name == '1' ? value : this.state.opening_time[this.state.day][0][2]],(name == '2' || name == '3')? ['1', name == '2' ? value : this.state.opening_time[this.state.day][1][1], name == '3' ? value : this.state.opening_time[this.state.day][1][2]]:['0']]


      }
    });

  
    await  this.props.setData({ opening_time: JSON.stringify(this.state.opening_time) })

    console.log('yyrt', this.state.opening_time)


  }
  componentDidMount(){
    console.log(JSON.stringify(this.props.opening_time["Mon"]),"opening_timenew")
  }

  render() {
    console.log(this.props.data.opening_time,"ggtggg propshas")
    console.log(this.state.opening_time,"ggtggg statehas")
    return <div className="has-opening-time-edit">
      {this.state.visible == true ?
        < OpenTimeModelEdit  handleChange={this.handleChange} visible={this.state.visible} closeModal={this.closeModal} setData={this.props.setData} data={this.props.data} opening_time={this.state.opening_time} day={this.state.day} send={this.props.send} />

        : null}
      <div className="openSwitchEdit">
        <p>Opening Time</p>
        <Switcher check={this.props.check} setCheck={this.props.setCheck} />
      </div>
{/* {this.state.opening_time["Mon"] !== undefined &&  */}
      <div className="container-days-op">
        <table>
          {this.props.days.map((y, i) => (
            <tr>
              <td> <p>{i == 0 ? "Monday" : ""} {i == 1 ? "Tuesday" : ""} {i == 2 ? "Wednesday" : ""}{i == 3 ? "Thursday" : ""}{i == 4 ? "Friday" : ""}{i == 5 ? "Saturday" : ""}{i == 6 ? "Sunday" : ""}: </p></td>
              <td className="middle-opening-time">  {this.state.opening_time[y] !== undefined &&this.state.opening_time[y].map((x, i) => (
                <p style={{ color: "#1a3e64" }}> <span style={{ color: "#1a740e" }}>Shifts{i + 1}. </span>  Opening : &nbsp; {x[1] !== undefined?x[1] : "-- : --"  || "-- : --"} closing :&nbsp; {x[2] !== undefined?x[2] : "-- : --"  || "-- : --"}</p>
              ))}   </td>
              <td>    <img src="/img/ui/editTime.png" style={{ width: "16px", height: "16px" }} onClick={() => this.setState({ visible: true, day: y })} />  </td>
            </tr>
          ))}
        </table>


        {/* <p style={{ color: "#111f35" }}>    1- Opening :  {this.props.data.opening_time['Mon'][0][1] || "00:00"} Clossing:  {this.props.data.opening_time['Mon'][0][2] || "00:00"}</p> */}
        {/* <p style={{ color: "#111f35" }}>    1- Opening :  {this.props.data.opening_time['Mon'][1][1] || "00:00"} Clossing:  {this.props.data.opening_time['Mon'][1][2] || "00:00"}</p> */}
      </div>
      {/* } */}
    </div>;
  }
}
DishUpdateFormNew.contextType = UserContext

export default DishUpdateFormNew;
