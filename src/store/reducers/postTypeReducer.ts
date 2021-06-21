import { PostTypeState } from "../../types/state-types";

const initState: PostTypeState = { type: "POST" };

const postTypeReducer = (state=initState, action: { type: string }) => {
  switch(action.type) {
    case "POST":
      return { ...state, type: "POST" };
    case "MEDIA":
      return { ...state, type: "MEDIA" };
    case "LINK":
      return { ...state, type: "LINK" };
    default:
      return { ...state };
  }
}

export default postTypeReducer;