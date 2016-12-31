// Define all possible view states
export const VIEW_STATE = {
  LOGIN_SCREEN: "login-screen",
  SPEAK_SCREEN: "speak-screen",
};

// Define all possible action types
export const AUTHENTICATE      = "authenticate";
export const RECEIVE_MESSAGE   = "receive-message";
export const SEND_MESSAGE      = "send-message";
export const CONFIRM_RECEPTION = "confirm-reception";

// Define action creators
export function authenticate(user) {
  return {
    type: AUTHENTICATE,
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
