import { FeedSortState } from "../../types/state-types";

const initState: FeedSortState = { sort: "TOP" };

const feedSortReducer = (state=initState, action: { type: string }) => {
  switch(action.type) {
    case "TOP":
      return { ...state, sort: "TOP" };
    case "NEW":
      return { ...state, sort: "NEW" };
    case "OLD":
      return { ...state, sort: "OLD" };
    default:
      return { ...state };
  }
};

export default feedSortReducer;