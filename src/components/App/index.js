import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './App.scss';
import Sidebar from '../Sidebar';
import Header from '../Header';
import LoginPage from '../LoginPage';
import { UserContext } from '../Context'
import { BrowserRouter } from "react-router-dom";
import Routers from '../Routes'
import { callApi } from '../../Helpers';
import NotifProvider from '../Provider/NotifProvider/NotifProvider'
import MessageProvider from '../Provider/MessageProvider/MessageProvider'



class App extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      user: this.context,
      redirect: false,
      // employee: { hotels: {} }
    }
    this.changeUser = this.changeUser.bind(this)
    this.logOut = this.logOut.bind(this)
  }
  componentDidMount() {

  }
  async changeUser(user, hotel) {
    // this.setState({ user: { ...user } });
    sessionStorage.setItem('user', JSON.stringify(user));
    if (user.role === 3) {
      let hotels = await callApi('hotels');
      user.hotel_id = [hotel || [...hotels.data.map(x => x.id)]];
    }
    else {
      let employee = await callApi('user/' + user.user_id);
      // console.log('employee hotel id', employee.data[0].hotels[0].id);
      user.hotel_id = [employee.data[0].hotels[0].id];
    }
    sessionStorage.setItem('user', JSON.stringify(user));
    this.setState({ user: { ...user } });

  }

  logOut() {
    this.setState({ user: { auth: false } })
    sessionStorage.setItem('user', JSON.stringify({ auth: false }));
    // sessionStorage.clear();
  }

  render() {

    return (
      <BrowserRouter>
        <UserContext.Provider value={this.state.user}>
          <NotifProvider>
            <MessageProvider>
              <UserContext.Consumer>
                {
                  user => user.auth ?
                    <>
                      <Header changeUser={this.changeUser} user={user}></Header>
                      <Sidebar logOut={this.logOut} user={user}></Sidebar>
                      <Routers />
                    </>
                    :
                    <LoginPage changeUser={this.changeUser} />
                }
              </UserContext.Consumer>
            </MessageProvider>
          </NotifProvider>
        </UserContext.Provider>
      </BrowserRouter>
    );
  }
}
App.contextType = UserContext
export default App;
