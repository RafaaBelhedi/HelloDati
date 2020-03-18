import { MessageContext } from '../../Context';
import React, { Component } from 'react';
class MessageProvider extends Component {
   state = {
      message:
      {
         sender: "0",
         message: "I did it",
         time: "1/10/2020 17:14:57",
         receiver: "lIZmNj75abRwLDO69sCgq5eZBkC2",
         hotel_id: "44",
         isseen: "true",
      }
   };

   setData = (message) => {

      this.setState({ message: { ...message } });

      sessionStorage.setItem('message', JSON.stringify(message))
   }


   render() {


      return (

         <MessageContext.Provider
            value={{

               setData: this.setData,

               message: ((JSON.parse(sessionStorage.getItem('message')) == null) || (JSON.parse(sessionStorage.getItem('message')) == undefined)) ? this.state.message : JSON.parse(sessionStorage.getItem('message')),

            }}
         >
            {this.props.children}
         </MessageContext.Provider>
      );
   }
}
export default MessageProvider;