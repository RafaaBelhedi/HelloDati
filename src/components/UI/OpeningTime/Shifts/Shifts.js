import React, { Component } from 'react';
import './Shifts.scss'
import TimeField from 'react-simple-timefield';

class Shifts extends Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = {

    }
 

  }

  componentDidMount() {



  }


  render() {
    console.log(this.props.index,"index")
    console.log(this.props.idx,"idx")
    if(this.props.input.length == 1){
      var n =0
      var p=1
    }else if(this.props.input.length == 2){
      var n=2
      var p=3
    }else if(this.props.input.length == 3){
      var n=4
      var p=5
    }

    
console.log(n ,"name")
console.log(p ,"name")

    return <>
    
      <div className="shift_container"  >
  <p>Shift{this.props.idx+1}</p>
          <div className="opening_container">
              <p>Opening</p> 

          <TimeField 
            // name="0"
            name= {n}
            // name={`0|${this.props.index}`}  
            onChange={this.props.handleChange}     className="input_shift"  />
          </div>
          <div className="closing_container">
              <p>Closing</p>
              <TimeField 
              // name="1"
              name= {p}
              // name={`1|${this.props.index}`} 
              onChange={this.props.handleChange} 
                className="input_shift"/> 


          </div>

          {/* <input  type="text" name="0"  onChange={this.props.handleChange}     className="input_shift" />
          <input   type="text" name="1"  onChange={this.props.handleChange}     className="input_shift" /> */}
      </div>
    </>;
  }
}

export default Shifts;


