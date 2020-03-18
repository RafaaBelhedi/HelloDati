import React from 'react';

export const UserContext = React.createContext(sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : { auth: false })
export const HotelContext = React.createContext(sessionStorage.getItem('hotel') ? JSON.parse(sessionStorage.getItem('hotel')) : { hotel: null })
export const NotifContext = React.createContext(sessionStorage.getItem('idNotif') ? sessionStorage.getItem('idNotif') : 0);
export const MessageContext = React.createContext();


