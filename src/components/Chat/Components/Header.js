
import React, { Component } from 'react';
import '../../../Config'
import * as firebase from 'firebase';
import './Header.scss'
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  componentWillMount() {
    // firebase.database()
    // .ref("Chats")
    // .push({
    //   sender:this.state.sender,
    //   receiver:this.state.receiver,
    //   message:this.state.message
    // })
    firebase.database()
      .ref("Chats")
      .on('value', gotData, errData);
    function gotData(data) {
      var chats = data.val();
      var keys = Object.keys(chats);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (chats[k].receiver == "e7NsTkSI4icHXC6c4iygbStk2Ja2") {
          var message = chats[k].message;
          var receiver = chats[k].receiver;
          var sender = chats[k].sender;
          var para = document.createElement("P");
          para.innerHTML = message + ' / ' + receiver + ' / ' + sender;
          document.getElementById("chatList").appendChild(para);
        }
      }
    }
    function errData(err) {
    }


  }
  render() {

    return (

      <div>
        <p className="chats">
          <ol id="chatList">

          </ol>
        </p>

      </div>

    )
  }
}
export default Header