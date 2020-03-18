import React, { Component } from 'react';
import { callApi } from '../../Helpers';
import MessageMaintenance from './MessageMaintenance/MessageMaintenance'
import MessageRoomService from './MessageRoomService/MessageRoomService'
import MessageRestaurant from './MessageRestaurant/MessageRestaurant'
import './ListMessage.scss'
import '../../Config'
import * as firebase from 'firebase';
// import {UserContext} from '../Context'
import {UserContext,MessageContext} from '../Context'

class ListMessage extends Component {
    constructor(props) {
        super(props)
        this.state = {
          gotData: data => {
            var users = data.val();
            this.setState({ users: Object.keys(users).map(x => users[x]) })
          },
          users: [] ,
          gotInfo: data =>{
            var chats = data.val();
            console.log(chats,"hhhh")
            this.setState({ chats: Object.keys(chats).map(x => chats[x]) })
          },
          chats: [] ,
          gotTourist: data =>{
            var tourists = data.val();
            console.log(tourists,"hhhh")
            this.setState({ tourists: Object.keys(tourists).map(x => tourists[x]) })
          },
          tourists: [] ,
        
        }
        this.groupBy = this.groupBy.bind(this)
    
      }
      async componentDidMount() {
        firebase.database()
          .ref("Users")
          .on('value', this.state.gotData, errData);
        function errData(err) {
          console.log('Error!');
      
        }
        firebase.database()
        .ref("Chats")
        .on('value', this.state.gotInfo, errData)
        await  firebase.database()
        .ref("Tourists")
        .on('value', this.state.gotTourist, errData);
      function errData(err) {
        console.log('Error!');
    
      }
      }
      direction =(path)=>{
        window.location.href=path
      }
   
    
      groupBy(objectArray, property) {
        return objectArray.reduce(function (acc, obj) {
            var key = obj[property];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});
    }
      render() {
        let messages1 = this.groupBy(this.state.chats, 'receiver');

        console.log(messages1,"messages1")

        let lastmessageOX0pReHXfXUTq1XnOnTSX7moiGp2= messages1["OX0pReHXfXUTq1XnOnTSX7moiGp2" ] 
        let lastmessagee7NsTkSI4icHXC6c4iygbStk2Ja2= messages1["e7NsTkSI4icHXC6c4iygbStk2Ja2" ] 
        let lastmessagelIZmNj75abRwLDO69sCgq5eZBkC2= messages1["lIZmNj75abRwLDO69sCgq5eZBkC2" ] 

let messageInbox1
if(lastmessageOX0pReHXfXUTq1XnOnTSX7moiGp2!== undefined){
 const senders1 = lastmessageOX0pReHXfXUTq1XnOnTSX7moiGp2.reduce((a, c) => {
  a[c.sender] = a[c.sender] || { data: [] };
  a[c.sender].data.push({ sender: c.sender, message: c.message, time: c.time, receiver: c.receiver, hotel_id: c.hotel_id, isseen: c.isseen });
  a[c.sender].data.sort((a, b) =>{console.log(new Date(b.time),'aaaaaaaaaaaaaa');return ( new Date(b.time).getTime() - new Date(a.time).getTime())})
  return a;
}, {})
 messageInbox1 = Object.values(senders1).map(s => s.data[0])
console.log("Lastmessages:", messageInbox1);}


let messageInbox2
if(lastmessagee7NsTkSI4icHXC6c4iygbStk2Ja2!== undefined){
  const senders2 = lastmessagee7NsTkSI4icHXC6c4iygbStk2Ja2.reduce((a, c) => {
   a[c.sender] = a[c.sender] || { data: [] };
   a[c.sender].data.push({ sender: c.sender, message: c.message, time: c.time, receiver: c.receiver, hotel_id: c.hotel_id, isseen: c.isseen });
   a[c.sender].data.sort((a, b) =>{console.log(new Date(b.time),'aaaaaaaaaaaaaa');return ( new Date(b.time).getTime() - new Date(a.time).getTime())})
   return a;
 }, {})
  messageInbox2 = Object.values(senders2).map(s => s.data[0])
 console.log("Lastmessages222:", messageInbox2);}


let messageInbox3 
 if(lastmessagelIZmNj75abRwLDO69sCgq5eZBkC2!== undefined){
  const senders3 = lastmessagelIZmNj75abRwLDO69sCgq5eZBkC2.reduce((a, c) => {
   a[c.sender] = a[c.sender] || { data: [] };
   a[c.sender].data.push({ sender: c.sender, message: c.message, time: c.time, receiver: c.receiver, hotel_id: c.hotel_id, isseen: c.isseen });
   a[c.sender].data.sort((a, b) =>{console.log(new Date(b.time),'aaaaaaaaaaaaaa');return ( new Date(b.time).getTime() - new Date(a.time).getTime())})
   return a;
 }, {})
  messageInbox3 = Object.values(senders3).map(s => s.data[0])
 console.log("Lastmessages333:", messageInbox3);}
let lasts
 if((lastmessagelIZmNj75abRwLDO69sCgq5eZBkC2!== undefined) && (lastmessagee7NsTkSI4icHXC6c4iygbStk2Ja2!== undefined)&& (lastmessageOX0pReHXfXUTq1XnOnTSX7moiGp2!== undefined)){
  let ListMessagelastes = [...messageInbox1, ...messageInbox2, ...messageInbox3];
  console.log(ListMessagelastes,"ListMessagelastes")
   lasts = ListMessagelastes.sort((a, b) =>{console.log(new Date(b.time),'aaaaaaaaaaaaaa');return ( new Date(b.time).getTime() - new Date(a.time).getTime())})
console.log("lastttttttttt",lasts)
 }


   console.log(this.state.chats,"chatschats")
   console.log(this.state.users,"chatsusers")
   console.log(this.state.tourists,"chatstourists")


    console.log(this.state.users,"usersmessage!!")
    console.log(this.state.chats,"chatsmessage!!")
    console.log(lasts,"lasts")

    console.log(this.state.tourists,"chatsmessagetourists!!")
          return<MessageContext.Consumer>
          {context => ( 
            <div className="list-message-container">
                <div className="title-msg">Message</div>
                <div className="msg-box">

  { ((lastmessagelIZmNj75abRwLDO69sCgq5eZBkC2!== undefined) && (lastmessagee7NsTkSI4icHXC6c4iygbStk2Ja2!== undefined)&& (lastmessageOX0pReHXfXUTq1XnOnTSX7moiGp2!== undefined)) ?
     lasts.map(item =>{
     return  (( item.receiver == "OX0pReHXfXUTq1XnOnTSX7moiGp2")  &&(item.hotel_id == this.context.hotel_id[0]))?
    <MessageRoomService  item={item} tourists={this.state.tourists} context={context} direction={this.direction}/>
    :
    (( item.receiver == "e7NsTkSI4icHXC6c4iygbStk2Ja2")  &&(item.hotel_id == this.context.hotel_id[0])) ?
     <MessageMaintenance  item={item} tourists={this.state.tourists} context={context} direction={this.direction} />
     :
     ((item.receiver == "lIZmNj75abRwLDO69sCgq5eZBkC2")  &&(item.hotel_id == this.context.hotel_id[0]))?
     <MessageRestaurant  item={item} tourists={this.state.tourists}  context={context} direction={this.direction}/>
     :""
   }) :""}


             </div>
             <div className="view-all-msg" onClick={event =>  window.location.href='/chat'} >
                <p>view all</p> 
             </div>
 
          </div>
           )}
           </MessageContext.Consumer>
      }
    
    
    
    
    
    
    }
    ListMessage.contextType = UserContext
    export default ListMessage;
