import React, { Component } from 'react';
import Contact from './Components/Contact';
import Messenger from './Components/Messenger'
import Services from './Components/Services'
import './Chats.scss'
import '../../Config'
import * as firebase from 'firebase';
// import {UserContext} from '../Context'
// import {UserContext} from '../Context'
import { UserContext, MessageContext } from '../Context'

class Chats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // gotData: data => {
      //   var users = data.val();
      //   // console.log(Object.keys(users).map(x => users[x]),"hhhusersh")
      //   this.setState({ users: Object.keys(users).map(x => users[x]) })
      // },
      users: [],
      gotInfo: data => {
        var chats = data.val();

        this.setState({ chats: Object.keys(chats).map(x => chats[x]) })
      },
      chats: [],
      inBox: "",
      senderService: [],
    }
    this.setId = this.setId.bind(this)
    this.setInBox = this.setInBox.bind(this)


  }


  async componentDidMount() {
    // firebase.database()
    //   .ref("Users")
    //   .on('value', this.state.gotData, errData);
    function errData(err) {
      console.log('Error!');

    }
    firebase.database()
      .ref("Chats")
      .on('value', this.state.gotInfo, errData)
    await this.setId({
      id: "OX0pReHXfXUTq1XnOnTSX7moiGp2",
      username: "Room Service",
      imageURL: ""

    })

  }

  async setId(users) {
    await this.setState({ users: { ...users } })


  }
  async setInBox(inBox) {
    await this.setState({ inBox: { ...inBox } })
  }





  render() {

    var sender = this.state.chats.filter(user => user.sender == this.state.users.id)

    var receiverall = this.state.chats.filter(user => user.receiver == this.state.users.id)

    var receiver = this.state.chats.filter(user => (user.receiver == this.state.users.id) && (user.hotel_id == this.context.hotel_id[0]))

    return (
      <MessageContext.Consumer>
        {context => (
          <div className="chatContainer">
            <div className="serviceContainer">
              <Services
                users={this.state.users}
                setId={this.setId}
                context={context}
              />
            </div>

            <div className="contactContainer" >
              <Contact chats={this.state.chats.filter(user => (user.receiver == this.state.users.id) && (user.hotel_id == this.context.hotel_id[0]))}
                inBox={this.state.inBox}
                setInBox={this.setInBox}
                users={this.state.users}
                context={context}
              />
            </div>

            <div className="messageContainer">
              <Messenger
                users={this.state.users}
                chats={this.state.chats}
                senderGuest={this.state.chats.filter(user => (user.sender == this.state.inBox.inBox) && (user.hotel_id == this.context.hotel_id[0]))}
                inBox={this.state.inBox}
                context={context}
                senderService={this.state.chats.filter(user => (user.sender == this.state.users.id) && (user.hotel_id == this.context.hotel_id[0]))} />
            </div>





          </div>
        )}
      </MessageContext.Consumer>
    );
  }

}
Chats.contextType = UserContext
export default Chats;