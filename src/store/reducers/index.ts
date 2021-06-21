import modalReducer from "./modalReducer";
import feedSortReducer from "./feedSortReducer";
import postTypeReducer from "./postTypeReducer";
import authReducer from "./authReducer";
import { combineReducers } from "redux";

export default combineReducers({
  postType: postTypeReducer,
  feedSort: feedSortReducer,
  modal: modalReducer,
  auth: authReducer,
});