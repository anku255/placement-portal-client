import { combineReducers } from "redux";
import { reducer as notifications } from "react-notification-system-redux";
import users from "./userReducer";
import cv from "./cvReducer";

export default combineReducers({
  notifications,
  users,
  cv
});
