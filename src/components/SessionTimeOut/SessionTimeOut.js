import React, { Component } from 'react';
import LoginPage from '../LoginPage'
class SessionTimeOut extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect:false
        }
        
        
      }
     componentDidMount(){
        setTimeout(
            function() {
                this.setState({redirect: true});
            }
            .bind(this),
            500000
        );
      }
      render() {
        if(this.state.redirect)
        return <LoginPage/>
         
      }
}
export default SessionTimeOut;
