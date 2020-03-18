import React, { Component } from 'react';
import MessageList from './Components/MessageList'
import Header from './Components/Header'
import MessageBox from './Components/MessageBox'
import './Chat.scss'

class Chat extends Component {
    constructor(props){
    super(props);
        
  }
  render() {
    return (
      <div className="chatContainer">
        {/* <div className="serviceContainer">
        <MessageList  />
        </div>
        <div className="contactContainerrrr" >
        <Header title="Simple Firebase App" />
        </div> */}
        <div className="messageContainer">
        <MessageBox/>
        </div>

       
      
          
        
      </div>
    );
  }

}

export default Chat;