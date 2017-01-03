// Define all possible view states
export const VIEW_STATE = {
  LOGIN_SCREEN: "login-screen",
  SPEAK_SCREEN: "speak-screen",
};

// Define all possible action types
export const ASSIGN_USER_ID     = "assign-user-id";
export const RECEIVE_MESSAGE    = "receive-message";
export const SEND_MESSAGE       = "send-message";
export const CONFIRM_RECEPTION  = "confirm-reception";
export const ADD_USER_TO_LIST   = "add-user-to-list";
export const DISCONNECT_USER    = "disconnect-user";
export const UPDATE_USERNAME    = "update-username";
export const UPDATE_LAST_ACTIVE = "update-last-active";

// Define action
export function assignUserID(user) {
  return {
    type: ASSIGN_USER_ID,
    user
  };
}

export function receiveMessage(message) {
  return {
    type: RECEIVE_MESSAGE,
    message
  };
}

export function sendMessage(message) {
  return {
    type: SEND_MESSAGE,
    message
  };
}

export function confirmReception(index) {
  return {
    type: CONFIRM_RECEPTION,
    index
  };
}

export function addUserToList(user) {
  return {
    type: ADD_USER_TO_LIST,
    user
  }
}

export function updateUsername(user) {
  return {
    type: UPDATE_USERNAME,
    user
  }
}

export function disconnectUserID(id) {
  return {
    type: DISCONNECT_USER,
    id
  }
}

export function updateLastActive(user) {
  return {
    type: UPDATE_LAST_ACTIVE,
    user
  }
}
