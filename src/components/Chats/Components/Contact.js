import React, { Component } from 'react';
import ReactSVG from 'react-svg'
import './chatsSection.scss'
import Inbox from './Inbox/Inbox'
import '../../../Config'
import { UserContext } from '../../Context'
import * as firebase from 'firebase';
class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: { ...this.props.chats },
      inBox: { ...this.props.inBox },
      gotData: data => {
        var tourists = data.val();
        console.log(tourists, "hhhh")
        this.setState({ tourists: Object.keys(tourists).map(x => tourists[x]) })
      },
      tourists: [],
   
    }
  }

  async componentDidMount() {
    await firebase.database()
      .ref("Tourists")
      .on('value', this.state.gotData, errData);
    function errData(err) {
      console.log('Error!');

    }

  }
  render() {

    const senders = this.props.chats.reduce((a, c) => {
      a[c.sender] = a[c.sender] || { data: [] };
      a[c.sender].data.push({ sender: c.sender, message: c.message, time: c.time, receiver: c.receiver, hotel_id: c.hotel_id, isseen: c.isseen });
      a[c.sender].data.sort((a, b) =>{console.log(new Date(b.time),'aaaaaaaaaaaaaa');return ( new Date(b.time).getTime() - new Date(a.time).getTime())})
      return a;
    }, {})
    var messageInbox = Object.values(senders).map(s => s.data[0])
    console.log("Latest messages:", messageInbox);


    console.log(this.props.chats, "contacttt")
    console.log(this.props.inBox.inBox, "inBoxxx")
    console.log(this.props.context.message, "inBoxxxy")
    console.log(this.props.context, "inBoxxxy")

const messageSelected = [this.props.context.message]


    return (
      <div className="mainContact">

        <div className="searchContact">
          <input placeholder="Search" />
        </div>
{/* This the selcted message from the listMessage in the topbBar */}
   <div className="contactList" >     
{(this.props.context.message.sender!== "0" )? 
messageSelected.map((msg) =>(
  <div className="InboxContainer" style={{  backgroundColor: "#21324c" }}  >
  <div className="ImageMsg">
    <img src="/img/chat/contact.png" className="imgContact" />
  </div>
  <div className="TextMsg">
    {this.state.tourists.map(name => {
      return name.id == msg.sender ?
        <p className="nameContact"> {name.nom}</p>
        : ""
    })}
    <p className="msgContact">
      {msg.message}
    </p>
  </div>
</div>
))
:""}
{/* This the render message from my firebase */}
          {messageInbox

            .map((chat ,index)=> (

              <Inbox chat={chat} context={this.props.context} inBox={this.props.inBox} setInBox={this.props.setInBox} tourists={this.state.tourists.filter(x => x.hotel_id == this.context.hotel_id[0])} chats={this.props.chats} key={index} />

            ))
          }




        </div>



      </div>
    );
  }

}
Contact.contextType = UserContext
export default Contact;