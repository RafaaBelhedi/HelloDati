import React, { Component } from 'react';
import '../../../Config'
import * as firebase from 'firebase';
import './Header.scss'

class MessageBox extends Component {
  constructor(props) {
    super(props);
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
    }
    console.log(this.state.users,"hiii")
  }
 

    componentDidMount() {
    firebase.database()
      .ref("Users")
      .on('value', this.state.gotData, errData);
    function errData(err) {
      console.log('Error!');
  
    }
    firebase.database()
    .ref("Chats")
    .on('value', this.state.gotInfo, errData)
  }

  render() {
console.log(this.state.users,"rrrr")
    var result = this.state.chats.filter(user => user.receiver == "e7NsTkSI4icHXC6c4iygbStk2Ja2");
    console.log(result,"fffffff")
    return (
      <div className="card">
        <div className="card-content">
          {this.state.users.map(user => (
            <p>{user.id}</p>
          ))}


              {result.map(chat => (
            <p>{chat.message}</p>
          ))}
        </div>
      </div>
    )
  }
}

export default MessageBox