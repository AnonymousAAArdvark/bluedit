import { AuthState } from "../../types/state-types";

let initState: AuthState = {
  user: null,
  authError: null,
};

const authReducer = (state=initState, action: { type: string, payload?: any }) => {
  switch(action.type) {
    case "LOGIN_SUCCESS":
      return {...state, authError: null};

    case "LOGIN_ERROR":
      console.error(action.payload);
      return {...state, authError: action.payload};

    case "SIGNUP_SUCCESS":
      return {...state, authError: null};

    case "SIGNUP_ERROR":
      console.error(action.payload!.message);
      return {...state, authError: action.payload};

    case "LOGOUT_SUCCESS":
      return {...state, user: null};

    case "LOGOUT_ERROR":
      console.error(action.payload);
      return {...state};

    case "USER_UPDATED":
      return {...state, user: action.payload};

    case "CLEANUP_LOGIN_ERROR":
      return {...state, authError: null};

    default:
      return {...state};
  }
};

export default authReducer;