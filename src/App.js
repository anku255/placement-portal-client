import React, { Component } from "react";
import { Provider } from "react-redux";

import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './_actions'
import store from "./store/store";
import Header from "./components/Header";
import Routes from "./components/Routes";
import Notifications from "./components/common/Notifications";


// Check for token
if (localStorage.jwtToken) {
  // Set auth token auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currenTime = Date.now() / 1000;
  if (decoded.exp < currenTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <Routes />
        <Notifications />
      </Provider>
    );
  }
}

export default App;
