import React           from 'react';
import { render }      from 'react-dom';
import { connect }     from 'react-redux';
import ViewApplication from './ViewApplication.jsx';
import { authenticate, receiveMessage, sendMessage, confirmReception, addUserToList } from './StateMachineDefinitions.js';

// This generates ContainerApplication, which passes the store's state onto Application, its child component.

const mapStateToProps = function(state)
{
  return {
    error:           state.error,
    view:            state.view,
    user: {
      username:      state.user.username,
      authenticated: state.user.authenticated,
      lastActive:    state.user.lastActive
    },
    userList:        state.userList,
    messages:        state.messages
  };
}

const mapDispatchToProps = function(dispatch) {
  return {
    login: (user) => {
      dispatch(authenticate(user));
    },
    send: (message) => {
      dispatch(sendMessage(message));
    },
    receive: (message) => {
      dispatch(receiveMessage(message));
    },
    confirm: (id) => {
      dispatch(confirmReception(id));
    },
    addUser: (user) => {
      dispatch(addUserToList(user));
    },
    disconnectUser: (id) => {
      dispatch(disconnectUserID(id));
    }
  }
}

const ContainerApplication = connect(mapStateToProps, mapDispatchToProps)(ViewApplication);

export default ContainerApplication;
