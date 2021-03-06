import React           from 'react';
import { render }      from 'react-dom';
import { connect }     from 'react-redux';
import ViewApplication from './ViewApplication.jsx';
import {
  joinChat,
  assignUserID,
  receiveMessage,
  sendMessage,
  confirmReception,
  addUserToList,
  updateUsername,
  disconnectUser
} from './StateMachineDefinitions.js';

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
    connectToChat: () => {
      dispatch(joinChat());
    },
    assignID: (user) => {
      dispatch(assignUserID(user));
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
    onUsernameChange: (user) => {
      dispatch(updateUsername(user));
    },
    onActivity: (user) => {
      dispatch(updateLastActive(user));
    },
    disconnectUser: (user) => {
      dispatch(disconnectUser(user));
    }
  }
}

const ContainerApplication = connect(mapStateToProps, mapDispatchToProps)(ViewApplication);

export default ContainerApplication;
