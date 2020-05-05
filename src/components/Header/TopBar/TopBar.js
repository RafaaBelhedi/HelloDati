import React, { Component } from 'react';
import './TopBar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import ReactSVG from 'react-svg'
import { UserContext } from '../../Context'
import { callApi } from '../../../Helpers';
import { userInfo } from 'os';
import ListNotification from '../../ListNotification/ListNotification'
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import ListMessage from '../../ListMessage/ListMessage';
import '../../../Config'
import * as firebase from 'firebase';

class TopBar extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      hotels: [],
      display: false,
      historyItems: [],
      countChat: '3',
      countMsg: '6',
      show: false,
      gotInfo: data => {
        var chats = data.val();
        if (chats != null)
          this.setState({ chats: Object.keys(chats).map(x => chats[x]) })
      },
      chats: [],
    }
    this.toggle = this.toggle.bind(this)
    this.handel = this.handel.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleOutsideClickMsg = this.handleOutsideClickMsg.bind(this);
    this.componentsNotif = this.componentsNotif.bind(this);
    this.SetSeen = this.SetSeen.bind(this);
    this.SetNotifCount = this.SetNotifCount.bind(this);

  }
  toggle() {
    if (!this.state.display) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState({ display: !this.state.display })
  }
  handel() {
    if (!this.state.show) {
      document.addEventListener('click', this.handleOutsideClickMsg, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClickMsg, false);
    }

    this.setState({ show: !this.state.show });
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }

    this.toggle();

  }
  handleOutsideClickMsg(e) {
    // ignore clicks on the component itself
    if (this.nodeMsg.contains(e.target)) {
      return;
    }
    this.handel();
  }
  componentsNotif(x) {
    return x.filter(x => !x.seen).length
  }

  async componentDidMount() {

    if (this.context.role == 3) {
      let hotels = await callApi('hotels');
      this.setState({ hotels: hotels.data });
      this.setState({ hotels: [...this.state.hotels.filter(x => x.id == this.context.hotel_id[0]), ...this.state.hotels] });
    }
    setInterval(() => {
       callApi('shopping_orders', { hotel_id: this.context.hotel_id[0] })
       .then((historyItems) => {
      if(historyItems.data!==undefined){
        this.setState({ historyItems: historyItems.data.filter(x => x.status == 1) })
      }}) 
    }, 3000)

    firebase.database()
      .ref("Chats")
      .on('value', this.state.gotInfo)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.historyItems !== prevState.historyItems) {
      this.componentsNotif(this.state.historyItems)
    }
  }

  SetSeen() {
    this.state.chats.forEach(MsgSeen => {
      var db = firebase.database();
      var query = db.ref("Chats").orderByChild("testSeen").equalTo(MsgSeen.sender + "/" + MsgSeen.receiver + "/" + this.context.hotel_id[0]);
      query.on("child_added", function (snapshot) {
        snapshot.ref.update({ isseen: "true" })
      });
    })

  }

  SetNotifCount() {
    callApi('shopping/seen', { hotel_id: this.context.hotel_id[0] }, 'POST').then(res => {

    })
  }

  render() {
console.log(this.state.historyItems,"historyItemsstate")

    const hotel = this.props.hotel;
    const post = this.props.post;
    let stars = []
    for (let i = 0; i < hotel.stars; i++)
      stars.push(<FontAwesomeIcon color="#ffde66" icon={faStar} />)
    return (
      <div className="topbar">


        <div className="topbar-hotel">
          <div className="translate_lang">
            <select  className="translate_lang_select">
            <option selected disabled hidden>Lang</option>
              <option>Eng</option>
              <option>Fr</option>
              <option>Ar</option>


            </select>
          </div>
          <div onClick={() => { this.toggle(); this.SetNotifCount() }} className="list-notification"  >
            <ReactSVG className="svg-icon" src="/img/header/notif.svg" />
            <div className="notif"  >
              <NotificationBadge count={this.componentsNotif(this.state.historyItems)} effect={Effect.SCALE} />
            </div>
            {this.state.display == true ?
              <div className="list-notification-position" ref={node => { this.node = node; }}>

                <ListNotification />

              </div>
              : null}
          </div>
          <div onClick={this.handel} className="chat-list" >
            {this.state.show === true ? this.SetSeen() : null}
            <ReactSVG className="svg-icon" src="/img/header/chat.svg" />
            <div className="notif">
              <NotificationBadge count={this.state.chats.filter(x => (x.sender !== "OX0pReHXfXUTq1XnOnTSX7moiGp2") && (x.sender !== "e7NsTkSI4icHXC6c4iygbStk2Ja2") && (x.sender !== "lIZmNj75abRwLDO69sCgq5eZBkC2") && (x.hotel_id == this.context.hotel_id[0]) && (x.isseen == "false")).length} effect={Effect.SCALE} />
            </div>
            {this.state.show == true ?
              <div className="list-msg-position" ref={nodeMsg => { this.nodeMsg = nodeMsg; }}>
                <ListMessage />
              </div>
              : null}
          </div >
          <img className="hotel-icon" src={post.cover} />
          <div className="hotel-desc">
            {this.context.role == 3 ? (
              <select onInput={(e) => this.props.changeUser(this.context, e.target.value).then(() => document.location.href = "/")}>
                {this.state.hotels.map(hotel => <option value={hotel.id}>{hotel.hotel_name}</option>)}
              </select>
            ) : <p>{hotel.hotel_name}</p>}
            {stars}
          </div>

        </div>
      </div>);
  }
}
TopBar.contextType = UserContext

export default TopBar;
