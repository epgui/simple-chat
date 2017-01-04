// Import state machine actions
import {
  JOIN_CHAT,
  ASSIGN_USER_ID,
  RECEIVE_MESSAGE,
  SEND_MESSAGE,
  CONFIRM_RECEPTION,
  ADD_USER_TO_LIST,
  DISCONNECT_USER,
  UPDATE_USERNAME,
  UPDATE_LAST_ACTIVE
} from './StateMachineDefinitions.js';

// Import state definitions
import { VIEW_STATE } from './StateMachineDefinitions.js';

export function ViewStateMachine(state = VIEW_STATE.LOGIN_SCREEN, action)
{
  switch (action.type)
  {
    case JOIN_CHAT:
      return VIEW_STATE.SPEAK_SCREEN;
    default:
      return state;
  }
}

export function UserStateMachine(state = {}, action)
{
  var now = new Date() / 1000;

  switch (action.type)
  {
    case ASSIGN_USER_ID:
      return {
        ...state,
        id: action.id,
        connected: true
      };
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.user.username,
        lastActive: action.user.lastActive
      };
    case SEND_MESSAGE:
      return {
        ...state,
        lastActive: now
      };
    case UPDATE_LAST_ACTIVE:
      if (action.user.id == state.id)
      {
        return {
          ...state,
          lastActive: now
        };
      }
      else
      {
        return state;
      }

    default:
      return state;
  }
}

export function UserListStateMachine(state = [], action)
{
  switch (action.type)
  {
    case ADD_USER_TO_LIST:
      return [
        ...state,
        {
          id:         action.user.id,
          username:   action.user.username,
          lastActive: action.user.lastActive,
          connected:  true
        }
      ];
    case UPDATE_USERNAME:
      return state.map(u => modifyUserList(u, action));
    case UPDATE_LAST_ACTIVE:
      return state.map(u => modifyUserList(u, action));
    case DISCONNECT_USER:
      return state.map(u => modifyUserList(u, action));
    default:
      return state;
  }
}

function modifyUserList(state = {}, action)
{
  if (state.id !== action.user.id)
  {
    return state
  }
  else
  {
    var now = new Date() / 1000;
    switch (action.type)
    {
      case UPDATE_USERNAME:
        return {
          ...state,
          username: action.user.username,
          lastActive: now
        };
      case UPDATE_LAST_ACTIVE:
        console.log("updating lastActive");
        return {
          ...state,
          lastActive: now
        };
      case DISCONNECT_USER:
        return {
          ...state,
          connected: false
        };
      default:
        return state;
    }
  }
}

export function MessageStateMachine(state = [], action)
{
  switch (action.type)
  {
    case RECEIVE_MESSAGE:
      return [
        ...state,
        {
          id:        action.message.id,
          contents:  action.message.contents,
          author:    action.message.author,
          validated: true,
          timestamp: action.message.timestamp
        }
      ];
    case SEND_MESSAGE:
      return [
        ...state,
        {
          id:        action.message.id,
          contents:  action.message.contents,
          author:    action.message.author,
          validated: false,
          timestamp: action.message.timestamp
        }
      ];
    case CONFIRM_RECEPTION:
      return state.map(m => messageReadReceipts(m, action));
    default:
      return state;
  }
}

function messageReadReceipts(state = {}, action)
{
  if (state.id !== action.id)
  {
    return state
  }

  return {
    ...state,
    validated: true
  };
}
