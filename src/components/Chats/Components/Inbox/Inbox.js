import React, { Component } from 'react';
import ReactSVG from 'react-svg'
import './Inbox.scss'
import { withRouter } from 'react-router-dom';
import '../../../../Config'
import * as firebase from 'firebase';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import { UserContext } from '../../../Context';
import { callApi } from '../../../../Helpers';

class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: { ...this.props.chats },
      inBox: { ...this.props.inBox },
      count: '',
      selected: "",
      touristRoom: []
    }
    this.SetSeen = this.SetSeen.bind(this)
  }
  SetSeen = () => {

    var db = firebase.database();
    var query = db.ref("Chats").orderByChild("testSeen").equalTo(this.props.chat.sender + "/" + this.props.chat.receiver + "/" + this.context.hotel_id[0]);
    query.on("child_added", function (snapshot) {
      snapshot.ref.update({ isseen: "true" })
    });
  }
  changeColor = (id) => {
    this.setState({ selected: id });
  };

  async componentDidMount() {
    this.changeColor(this.props.inBox.inBox);
    let tourists = await callApi('tourists', { hotel_id: this.context.hotel_id[0] })
    this.setState({ touristRoom: tourists.data });
  }

  componentDidUpdate(prevProps) {
    if (this.props.inBox.inBox !== prevProps.inBox.inBox) {
      this.changeColor(this.props.inBox.inBox)
    }
  }
  render() {
    var allMsgSender = this.props.chats.filter(user => (user.sender == this.props.chat.sender))
    return (
      <div className="InboxContainer" style={{ backgroundColor: this.state.selected == this.props.chat.sender ? "#21324c" : "" }} onClick={() => { this.props.setInBox({ inBox: this.props.chat.sender }).then(() => { this.SetSeen() }); this.props.context.setData({ sender: "0", message: "", time: "", receiver: "", hotel_id: "", isseen: "" }); this.changeColor(this.props.inBox.inBox); }}  >


        <div className="ImageMsg">
          <img src="/img/chat/contact.png" className="imgContact" />
        </div>

        <div className="TextMsg">
          <div className="name_and_message">
            <div className="my_sender_name">
              {this.props.tourists.map(name => {
                return name.id == this.props.chat.sender ?
                  <p className="nameContact"> {name.nom}</p>
                  : ""
              })}
            </div>
            <div className="my_message_receive">
              {this.props.chat.message}
            </div>
          </div>

          <div className="room_and_number">
            <div className="my_room">
              <p>Room Number </p>
            </div>
            <div className="my_room_number">
              {this.state.touristRoom.map(name => {
                return name.id == this.props.chat.sender ?
                  <p className="roomNumber"> {name.stay.device_room.room.room_number}</p>
                  : ""
              })}
            </div>

          </div>


        </div>

        <div className="msg_not_seen">

          <NotificationBadge count={allMsgSender.filter(x => x.isseen == "false").length} effect={Effect.SCALE} />
        </div>

      </div>
    );
  }

}
Inbox.contextType = UserContext
export default withRouter(Inbox);