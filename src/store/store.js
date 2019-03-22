import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const initialState = {};
const middleware = [thunk];

// Activate redux-logger only in developement
if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");

  middleware.push(logger);
}

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
