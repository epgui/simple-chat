// Import state machine actions
import {
  AUTHENTICATE,
  RECEIVE_MESSAGE,
  SEND_MESSAGE,
  CONFIRM_RECEPTION,
  ADD_USER_TO_LIST,
  DISCONNECT_USER
} from './StateMachineDefinitions.js';

// Import state definitions
import { VIEW_STATE } from './StateMachineDefinitions.js';

export function ViewStateMachine(state = VIEW_STATE.LOGIN_SCREEN, action)
{
  switch (action.type)
  {
    case AUTHENTICATE:
      return VIEW_STATE.SPEAK_SCREEN;
    default:
      return state;
  }
}

export function UserStateMachine(state = {}, action)
{
  switch (action.type)
  {
    case AUTHENTICATE:
      return {
        ...state,
        username: action.username,
        authenticated: true,
        lastActive: action.timestamp
      };
    case SEND_MESSAGE:
      return {
        ...state,
        lastActive: action.timestamp
      };
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
    case DISCONNECT_USER:
      return state.map(u => modifyUserList(u, action));
    default:
      return state;
  }
}

function modifyUserList(state = {}, action)
{
  if (state.id !== action.id)
  {
    return state
  }
  else
  {
    switch (action.type)
    {
      case DISCONNECT_USER:
        return {
          ...state,
          connected: false
        };
      case UPDATE_LAST_ACTIVE:
        var now = new Date();
        return {
          ...state,
          lastActive: now
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
