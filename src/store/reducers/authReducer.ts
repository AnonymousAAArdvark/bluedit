import { AuthState } from "../../types/state-types";

let initState: AuthState = {
  user: null,
  authError: null,
};

const authReducer = (state=initState, action: { type: string, payload?: any }) => {
  switch(action.type) {
    case "LOGIN_SUCCESS":
      console.log("login success");
      return {...state, authError: null};

    case "LOGIN_ERROR":
      console.log("login error");
      console.error(action.payload);
      return {...state, authError: action.payload};

    case "SIGNUP_SUCCESS":
      console.log("signup success");
      return {...state, authError: null};

    case "SIGNUP_ERROR":
      console.log("signup error");
      console.error(action.payload!.message);
      return {...state, authError: action.payload};

    case "LOGOUT_SUCCESS":
      console.log("logout success");
      return {...state, user: null};

    case "LOGOUT_ERROR":
      console.log("logout error");
      console.error(action.payload);
      return {...state};

    case "USER_UPDATED":
      console.log("user updated");
      return {...state, user: action.payload};

    case "CLEANUP_LOGIN_ERROR":
      console.log("cleanup login error");
      return {...state, authError: null};

    default:
      return {...state};
  }
};

export default authReducer;