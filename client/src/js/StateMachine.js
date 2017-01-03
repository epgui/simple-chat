// Import state machine components
import { ViewStateMachine, UserStateMachine, UserListStateMachine, MessageStateMachine } from './StateMachineComponents.js';
// Import state definitions
import { VIEW_STATE } from './StateMachineDefinitions.js';

// Get current time
var now = new Date();

// Initialize application state
export const initialState = {
  error: false,
  view: VIEW_STATE.SPEAK_SCREEN,
  user: {
    id: null,
    username: "John Doe",
    lastActive: now,
    connected: false
  },
  userList: [],
  messages: []
};

// The state machines are just Redux reducers
export function StateMachine(state = initialState, action)
{
  return {
    error:    false, // Because mistakes are for noobs
    view:     ViewStateMachine(state.view, action),
    user:     UserStateMachine(state.user, action),
    userList: UserListStateMachine(state.userList, action),
    messages: MessageStateMachine(state.messages, action)
  }
}
