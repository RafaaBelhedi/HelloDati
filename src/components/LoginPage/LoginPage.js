import React, { Component } from 'react';
import './LoginPage.css'
import { UserContext } from '../Context'
class LoginPage extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      email: '',
      password: '',
      buttonText: 'Valider',
      user: this.context,
      response: 0,
    }

    this.abortCtrl = new AbortController();
    this.changePassword = this.changePassword.bind(this)
    this.changeEmail = this.changeEmail.bind(this)
    this.attemptLogin = this.attemptLogin.bind(this)
  }


  attemptLogin(e) {
    e.preventDefault()
    this.setState({ error: false })
    this.setState({ loading: true, buttonText: 'Logging in...' })
    fetch(`https://apitndati.com/v003/public/auth/login?client_id=${this.state.client_id}&client_secret=${this.state.client_secret}&password=${this.state.password}&email=${this.state.email}`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Access-Control-Allow-Origin': '*',
      },
      signal: this.abortCtrl.signal
    })
      .then(val => {
        return val.json()
      })
      .then(val => {
        if (val.message) {
          this.setState({ buttonText: val.message, loading: false, error: true })
          return
        }
        this.setState({ buttonText: "You will be redirected shortly" })
        this.setState({ user: { ...this.state.user, ...val } })
        this.setState({ user: { ...this.state.user, auth: true } })

        return fetch(`https://apitndati.com/v003/public/auth/privileges`, {
          headers: {
            'Accept': '*/*',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${this.state.user.access_token}`
          }
        })
      })
      .then(val => val.json())
      .then(val => {
        this.setState({ user: { ...this.state.user, ...val } })
        this.props.changeUser(this.state.user)
      })
      .catch(error => {
        this.setState({ buttonText: 'Error. Try again', loading: false, error: true })
        console.log(error)
      })
  }

  componentWillUnmount() {
    this.abortCtrl.abort()
  }

  changePassword(e) {
    this.setState({ password: e.target.value })
  }

  changeEmail(e) {
    this.setState({ email: e.target.value })
  }

  render() {
    return (
      <div className="fluid-container login-container">
        <img src="/img/login/login-logo.png" />
        <div className="dots" style={{ magin: '5px' }}>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <form action="#" onSubmit={this.attemptLogin} className="login-form text-center container">
          <input required type="email" onInput={this.changeEmail} className="col-md-2 col-sm-12" id="username" placeholder="E-Mail" />
          <input required onInput={this.changePassword} className="col-md-2 col-sm-12" id="password" type="password" placeholder="Password" />
          <div>
            <button style={{
              color: this.state.error ? 'red' : '#f7e200'
            }} type="submit" className="col-12">
              {
                this.state.loading ?
                  <span style={{ color: 'white' }} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
                  <img src="/img/login/login-validate.png" />
              }{this.state.buttonText}
            </button>
          </div>
        </form>
      </div>);
  }
}
LoginPage.contextType = UserContext
export default LoginPage;
