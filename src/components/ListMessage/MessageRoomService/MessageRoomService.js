import React, { Component } from 'react';

import './MessageRoomService.scss'
class MessageRoomService extends Component {
    constructor(props) {
        super(props)
        this.state = {
           
        
        }
    
    
      }
 
   
      render() {
        console.log(this.props.item,"room")
        console.log(this.props.context,"roomcontext")


    //     var touristSender =this.props.tourists.reduce((touristSender,item)=>{
    //         if (item.id == this.props.item.sender)  {
    //           touristSender.push(item);
    //         }
    //         return touristSender;
            
    //       }, []);

    //   console.log(touristSender.nom,"touristSender!!")
        return <div className="msg-room-container" onClick={()=>{this.props.context.setData(this.props.item);this.props.direction('/chat')}}  >
        <div className="logo-msg-room">
      
        <img src="/img/header/room.png" style={{height:"32px", width:"32px"}} />
        </div>
        <div className="message-container">
        {this.props.tourists.map(name =>{
    return name.id == this.props.item.sender ? 
  <div className="tourist-name"> {name.nom}</div>
    :""
  })}

            <div className="type-order"> {this.props.item.message} </div>

        </div>
        <div className="time-message"> {this.props.item.time}  </div>
    </div>
      }
    
    
    
    
    
    
    }
    export default MessageRoomService;
