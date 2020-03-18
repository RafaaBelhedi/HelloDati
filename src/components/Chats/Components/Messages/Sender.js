import React, { Component } from 'react';
import ReactSVG from 'react-svg'
import './Sender.scss'
import '../../../../Config'
import * as firebase from 'firebase';
class receiver extends Component {
  constructor(props) {
    super(props);
      
  }

  render() {

  

   
    return (
      <div className="sendContainer">
        <div className="sendHeader">
          <p className="time">
            {this.props.msg.time}
          </p>
        </div>


        <div className="sendcontaint">

          <div className="messageSend" >
            <p> {this.props.msg.message} </p>


{/* 
            <ReactSVG
              src="/img/chat/seen.svg"
              className="svgIconSeensend"
            /> */}


          </div>






        </div>


      </div>
    );
  }

}

export default receiver;