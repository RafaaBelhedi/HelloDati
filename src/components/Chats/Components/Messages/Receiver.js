import React, { Component } from 'react';
import ReactSVG from 'react-svg'
import'./Receiver.scss'

class Sender extends Component {
    constructor(props){
    super(props);
        
  }
  render() {
    return (
      <div className="ReceiverContainer">

    
       
                  <div className="ReceiverHeader">
                  <p className="time"> {this.props.msg.time} </p>
                 </div>
                 <div className="Receivercontaint">
                 <div className="message" >
                 <p> {this.props.msg.message}</p>
        
                 </div>

        </div>




    
      



        
      </div>
    );
  }

}

export default Sender;