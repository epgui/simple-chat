// Import state machine actions
import { AUTHENTICATE, RECEIVE_MESSAGE, SEND_MESSAGE, CONFIRM_RECEPTION } from './StateMachineDefinitions.js';
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
