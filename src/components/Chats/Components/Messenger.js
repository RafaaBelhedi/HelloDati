import React, { Component } from 'react';
import './chatsSection.scss'
import ReactSVG from 'react-svg'
import Sender from './Messages/Sender'
import Receiver from './Messages/Receiver'
import '../../../Config'
import * as firebase from  'firebase';
import {UserContext} from '../../Context';
import ReactDOM from 'react-dom';
class Messenger extends Component {
    constructor(props){
    super(props);
    this.state = {
      chats:{...this.props.chats},
      inBox:{...this.props.inBox},
      users:{...this.props.users},
      message:"",
    }
    this.Submit=this.Submit.bind(this)
    this.resetMessage=this.resetMessage.bind(this);
  }

  
 
  Submit = e =>{
    e.preventDefault();
    firebase.database()
    .ref("Chats")
    .push({
      message:this.state.message,
      receiver:this.props.inBox.inBox,
      sender:this.props.users.id,
      time:(new Date().getMonth()+1)+"/"+new Date().getDate()+"/"+new Date().getFullYear()+" "+ new Date().getHours()+ ":" +new Date().getMinutes()+":" +new Date().getSeconds(),
      isseen:"false",
      hotel_id: this.context.hotel_id[0],
      testSeen:this.props.users.id+"/"+this.props.inBox.inBox+"/"+ this.context.hotel_id[0]
    })
  }
  
  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: "auto" });
}


resetMessage() {
  this.setState({message:"" });
}


  render() {
    // var result = this.props.chats.filter(chat => chat.sender == this.props.inBox.inBox)
    // console.log(new Date().getHours()+ ":" +new Date().getMinutes()+"/"+new Date().getDate()+"/"+new Date().getMonth()+"/"+new Date().getFullYear(),"time")
    // console.log(result,"resultresult")
  
    console.log(this.props.chats,"chatsmessage")
    console.log(this.props.users.id,"usersusersusersusers22")
     console.log(this.state.inBox.inBox,"this.state.inBox.inBox")
    console.log(this.props.senderService,"senderServicesenderService")
    console.log(this.props.inBox.inBox,"inbox44")
    console.log(this.props.context.message,"this.props.context.message.sender")
    
    // var show = this.props.senderService.filter(user => user.receiver == this.props.inBox.inBox)
    // console.log(show,"showshowshow")


    let MessengerSelect = this.props.chats.filter(msg => (msg.sender == this.props.context.message.sender)&& (msg.message == this.props.context.message.message))
    console.log(MessengerSelect,"MessengerSelectMessengerSelect")

        
    let message =this.props.chats.reduce((message,item)=>{
      if (((item.receiver == this.props.users.id) && (item.sender == this.props.inBox.inBox) &&(item.hotel_id == this.context.hotel_id[0])) || ((item.receiver == this.props.inBox.inBox) && (item.sender == this.props.users.id) &&(item.hotel_id == this.context.hotel_id[0]) ) ) {
        message.push(item);
      }
      return message;
      
    }, []);
    console.log(message,"message")

    return (
      <div className="messengerContainer">

        <div  className="messengerHeader">
            <ReactSVG
              src="/img/chat/setting.svg"
              className="svgIcon"
            />
        </div>

       <div className="messengerContainer">
       
{console.log(message,"here")}
   {(this.props.context.message.sender == 0 ? message : MessengerSelect).map(msg =>{
     return msg.sender == this.props.users.id ? 
     <Receiver msg={msg}/>:
     <Sender msg={msg}/>
   })}
      
      <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                      </div>
       </div>

   <div className="sendContainerMain" >
   <div className="messagesend" >
     <div className="inputSend">
     <form onSubmit={(e)=>{this.Submit(e);this.resetMessage()}}>
       <input placeholder="Write a message..."  className="msgInput"   value= {this.state.message}  onChange={(e) => this.setState({ message: e.target.value })} />
       </form>
     </div>
   </div>
   <div className="messagesendImg">
   <img src="/img/chat/forme-9@2x.png" alt="send" className="imgSend" onClick={(e)=>{this.Submit(e);this.resetMessage()}} />
   </div>
   </div>
          
        
      </div>
    );
  }

}
Messenger.contextType = UserContext;
export default Messenger;