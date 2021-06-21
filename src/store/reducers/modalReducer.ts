import { ModalState } from "../../types/state-types";

const initState: ModalState = { status: "" };

const modalReducer = (state=initState, action: { type: string }) => {
  switch(action.type) {
    case "LOGIN":
      return { ...state, status: "LOGIN" };
    case "SIGNUP":
      return { ...state, status: "SIGNUP" };
    case "":
      return { ...state, status: "" };
    default:
      return { ...state };
  }
};

export default modalReducer;