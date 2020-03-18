import React, { Component } from 'react';
import './OpeningTime.scss'
import { callApi } from '../../../Helpers';
import Shifts from './Shifts/Shifts'
import Switcher from '../../Form/RestaurantForm/Switch/Switcher'

class OpeningTime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opening_time: {
        "Mon": [["0"], ["0"]],
        "Tue": [["0"], ["0"]],
        "Wed": [["0"], ["0"]],
        "Thu": [["0"], ["0"]],
        "Fri": [["0"], ["0"]],
        "Sat": [["0"], ["0"]],
        "Sun": [["0"], ["0"]],
      },

      day: 'Mon',
      inputs: ['input-0'],
      color: "#1a3e64",
      style: {
        BackColor: '"#1a3e64"',
        color: '#ffffff'
      },
      posts: [],
      noShifts: false,
      backgroundMon:"#1a3e64",
      backgroundTue:"#1a3e64",
      backgroundWed:"#1a3e64",
      backgroundThurs:"#1a3e64",
      backgroundFrid:"#1a3e64",
      backgroundSat:"#1a3e64",
      backgroundSun:"#1a3e64",
      colorMon:"#ffffff",
      colorTue:"#ffffff",
      colorWed:"#ffffff",
      colorThurs:"#ffffff",
      colorFrid:"#ffffff",
      colorSat:"#ffffff",
      colorSun:"#ffffff",


    }
    this.handleChange = this.handleChange.bind(this);
    this.appendInput = this.appendInput.bind(this);
    this.changeBackgrouand = this.changeBackgrouand.bind(this)
    this.lessInput = this.lessInput.bind(this)
  }
  handleChange(e) {
    console.log('zzzzz')
    const target = e.target;
    const name = target.name;
    const value = target.value;
    // let day = this.state.opening_time[this.state.day].slice()
    // let day =   [this.state.day].toString()
    this.setState({
      opening_time: {
        ...this.state.opening_time,
        //  [this.state.day]: [["1","08:30","12:30"] ,["1","14:30","22:30"]]
        //  [this.state.day]: [["1","08:30","12:00"] ,["1", "13:00", "15:00"]]

        [this.state.day]: [['1', name == '0' ? value : this.state.opening_time[this.state.day][0][1], name == '1' ? value : this.state.opening_time[this.state.day][0][2]], (name == '2' || name == '3') ? ['1', name == '2' ? value : this.state.opening_time[this.state.day][1][1], name == '3' ? value : this.state.opening_time[this.state.day][1][2]] : ['0']]


      }
    });

    this.props.setData({ opening_time: JSON.stringify(this.state.opening_time) })
    // this.props.setData({ has_opening_time: 1 })
    // this.props.setData({opening_time:this.state.opening_time})

    console.log('dss', this.state.opening_time)
    console.log('day', this.state.day)
    console.log('dsss', this.state.opening_time[this.state.day][1])
    console.log('dsssm', this.state.opening_time[this.state.day][2])
    console.log(JSON.stringify(this.state.opening_time), "dssse")
    console.log(this.state.opening_time)

  }

  appendInput() {
    if (this.state.inputs.length <= 1) {
      var newInput = `input-${this.state.inputs.length}`;
      this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));
    } else {
      this.setState({ noShifts: true })
    }
  }
  lessInput() {
    this.state.inputs.length = "0"
    var newInput = `input-${this.state.inputs.length}`;
    this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));

  }





  setDay = x => {
    this.setState({ day: x })
  }
  changeBackgrouand(e) {
    var newColor = this.state.color == "#1a3e64" ? "#d9d9d9" : "#1a3e64";

    this.setState({ color: newColor })
  }
  changeBackgrouand(e) {
    var newColor = this.state.color == "#1a3e64" ? "#d9d9d9" : "#1a3e64";

    this.setState({ color: newColor })
  }

  async componentDidMount() {

    let posts = await callApi('posts')
    this.setState({ posts: posts.data })

  }
  render() {
    console.log(this.state.opening_time[this.state.day].map((x, i) => (
      { x }
    )), "lalalalal")

    return <>

      <div className="opening_time" >

        <div className="times_container">
          <div className="title">
            <p>Opening Time</p>
            <Switcher check={this.props.check} setCheck={this.props.setCheck} />
          </div>
          <div className="shifts">
            {this.state.inputs.map((input, idx) => <Shifts key={input} input={this.state.inputs} idx={idx} index={this.state.opening_time[this.state.day].length} opening_time={this.state.opening_time} handleChange={this.handleChange} />)}


          </div>
          {this.state.noShifts == true ? <p style={{ color: "red" }}>No shift to add </p> : ""}
          <div className="button">
            <div className="button_shift" onClick={() => this.appendInput()}>
              <img src="/img/ui/addShift.png" style={{ width: "23px", height: "23px" }} />
              <p>Add Shift</p>
            </div>

          </div>
          <div className="details">
            {/* <p>1. Opening 11:00 closing 23:00</p> */}
            {/* {this.state.opening_time[this.state.day].map((x, i) => (
              <p style={{color:"green"}}> Shifts{i + 1}. Opening {x[1]} closing {x[2]}</p>
            ))} */}


            <p style={{ color: "#111f35" }}>    1- Opening :  {this.state.opening_time[this.state.day][0][1] || "00:00"} Clossing:  {this.state.opening_time[this.state.day][0][2] || "00:00"}</p>
            {this.state.inputs.length == 2 ?
              <p style={{ color: "#111f35" }}>    2- Opening :  {this.state.opening_time[this.state.day][1][1] || "00:00"} Clossing:  {this.state.opening_time[this.state.day][1][2] || "00:00"}</p>
              : ""}
            {/* {this.state.inputs.length==3 ?
          <p style={{color:"green"}}>   Shift 3 Opening :  {this.state.opening_time[this.state.day][2][1]||"00:00"} Clossing:  {this.state.opening_time[this.state.day][2][2]||"00:00"}</p>
      :""} */}
          </div>



        </div>

        <div className="days_container">
          <div className="days_groupe">
            <span className="day" style={{backgroundColor:this.state.backgroundMon,color:this.state.colorMon}} onClick={() => { this.setDay('Mon'); this.setState({backgroundMon:"#d9d9d9",backgroundTue:"#1a3e64",backgroundWed:"#1a3e64",backgroundThurs:"#1a3e64",backgroundFrid:"#1a3e64",backgroundSat:"#1a3e64",backgroundSun:"#1a3e64",colorMon:"#142238",colorTue:"#ffffff",colorWed:"#ffffff",colorThurs:"#ffffff",colorFrid:"#ffffff",colorSat:"#ffffff",colorSun:"#ffffff"}); }}>Mon </span>
            <span className="day" style={{backgroundColor:this.state.backgroundTue,color:this.state.colorTue}} onClick={() => { this.setDay('Tue'); this.lessInput(); this.setState({backgroundMon:"#1a3e64",backgroundTue:"#d9d9d9",backgroundWed:"#1a3e64",backgroundThurs:"#1a3e64",backgroundFrid:"#1a3e64",backgroundSat:"#1a3e64",backgroundSun:"#1a3e64",colorMon:"#ffffff",colorTue:"#142238",colorWed:"#ffffff",colorThurs:"#ffffff",colorFrid:"#ffffff",colorSat:"#ffffff",colorSun:"#ffffff"}); }}>Tues</span>
            <span className="day" style={{backgroundColor:this.state.backgroundWed,color:this.state.colorWed}} onClick={() => { this.setDay('Wed'); this.lessInput(); this.setState({backgroundMon:"#1a3e64",backgroundTue:"#1a3e64",backgroundWed:"#d9d9d9",backgroundThurs:"#1a3e64",backgroundFrid:"#1a3e64",backgroundSat:"#1a3e64",backgroundSun:"#1a3e64",colorMon:"#ffffff",colorTue:"#ffffff",colorWed:"#142238",colorThurs:"#ffffff",colorFrid:"#ffffff",colorSat:"#ffffff",colorSun:"#ffffff"}); }}>Wed</span>
          </div>
          <div className="days_groupe">
            <span className="day" style={{backgroundColor:this.state.backgroundThurs,color:this.state.colorThurs}} onClick={() => { this.setDay('Thu'); this.lessInput(); this.setState({backgroundMon:"#1a3e64",backgroundTue:"#1a3e64",backgroundWed:"#1a3e64",backgroundThurs:"#d9d9d9",backgroundFrid:"#1a3e64",backgroundSat:"#1a3e64",backgroundSun:"#1a3e64",colorMon:"#ffffff",colorTue:"#ffffff",colorWed:"#ffffff",colorThurs:"#142238",colorFrid:"#ffffff",colorSat:"#ffffff",colorSun:"#ffffff"}); }}>Thurs</span>
            <span className="day" style={{backgroundColor:this.state.backgroundFrid,color:this.state.colorFrid}} onClick={() => { this.setDay('Fri'); this.lessInput(); this.setState({backgroundMon:"#1a3e64",backgroundTue:"#1a3e64",backgroundWed:"#1a3e64",backgroundThurs:"#1a3e64",backgroundFrid:"#d9d9d9",backgroundSat:"#1a3e64",backgroundSun:"#1a3e64",colorMon:"#ffffff",colorTue:"#ffffff",colorWed:"#ffffff",colorThurs:"#ffffff",colorFrid:"#142238",colorSat:"#ffffff",colorSun:"#ffffff"}); }}>Frid</span>
            <span className="day" style={{backgroundColor:this.state.backgroundSat,color:this.state.colorSat}} onClick={() => { this.setDay('Sat'); this.lessInput(); this.setState({backgroundMon:"#1a3e64",backgroundTue:"#1a3e64",backgroundWed:"#1a3e64",backgroundThurs:"#1a3e64",backgroundFrid:"#1a3e64",backgroundSat:"#d9d9d9",backgroundSun:"#1a3e64",colorMon:"#ffffff",colorTue:"#ffffff",colorWed:"#ffffff",colorThurs:"#ffffff",colorFrid:"#ffffff",colorSat:"#142238",colorSun:"#ffffff"}); }}>Satur</span>
          </div>
          <div className="days_groupe ">
            <span className="day" style={{backgroundColor:this.state.backgroundSun,color:this.state.colorSun}} onClick={() => { this.setDay('Sun'); this.lessInput(); this.setState({backgroundMon:"#1a3e64",backgroundTue:"#1a3e64",backgroundWed:"#1a3e64",backgroundThurs:"#1a3e64",backgroundFrid:"#1a3e64",backgroundSat:"#1a3e64",backgroundSun:"#d9d9d9",colorMon:"#ffffff",colorTue:"#ffffff",colorWed:"#ffffff",colorThurs:"#ffffff",colorFrid:"#ffffff",colorSat:"#ffffff",colorSun:"#142238"}); }}>Sun</span>

          </div>

        </div>

      </div>
    </>;
  }
}

export default OpeningTime;