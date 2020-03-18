import React, {Component} from 'react';
import '../../../Config'
import * as firebase from  'firebase';
import './Header.scss'
import ReactSVG from 'react-svg'
class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      // sender:"OX0pReHXfXUTq1XnOnTSX7moiGp2",
      // receiver:"14",
      // message:"hobba <3 ",
      // Users: []
      id:"",
      username:"",
      imageURL:""

    };

  }

  componentWillMount(){
    // firebase.database()
    // .ref("Chats")
    // .push({
    //   sender:this.state.sender,
    //   receiver:this.state.receiver,
    //   message:this.state.message
    // })
   firebase.database()
    .ref("Users")
    .on('value', gotData , errData);
    function gotData (data) {
      var users = data.val();
      console.log(users ,"uuuuuuuuuuuu")
      var keys=Object.keys(users);
      console.log(keys,"keys")
      for (var i = 0; i<keys.length; i++){
        var k = keys[i];
        console.log(k,"kkkkk")
        console.log(users[k],"myuser")
        console.log(users[k].username,"myusernameeeee")
        console.log(users[k].id,"iduserrrr")
        console.log((users[k].username == "Maintenance"),"myusernameMaintenance")
        if (users[k].username == "Maintenance" ||  users[k].username =="Restaurant"  ||  users[k].username =="Room Service" ) {
        var id = users[k].id;
        var username = users[k].username;
        var imageURL = users[k].imageURL;
    var para = document.createElement("P");
    para.innerHTML = username+' / '+id+' / '+imageURL;
    document.getElementById("userList").appendChild(para);
      }}  
      
    }
    function errData (err) {
      console.log('Error!');
    }


  }
 

  render() {
    
      return (
        <div className="card">
          <div className="card-content">
        
          <p className="service"> 
          
      
            <ol id="userList" className="seviceUser"> 

             </ol>

 
          </p>
   

          </div>
        </div>
      )

  }
}

export default MessageList