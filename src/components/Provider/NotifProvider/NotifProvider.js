import { NotifContext } from '../../Context';
import React, { Component } from 'react';
class NotifProvider extends Component {
   state = {

      id: 0,


   };
   setId = (id) => {
      this.setState({ id: id })
      sessionStorage.setItem('idNotif', id)
   }
   componentDidMount() {
   }

   render() {
      return (

         <NotifContext.Provider
            value={{
               id: (sessionStorage.getItem('idNotif') == null) ? 0 : sessionStorage.getItem('idNotif'),
               setId: this.setId,


            }}
         >
            {this.props.children}
         </NotifContext.Provider>
      );
   }
}
export default NotifProvider;