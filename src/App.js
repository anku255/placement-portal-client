import React, { Component } from "react";
import { Provider } from "react-redux";

import store from "./store/store";
import Header from "./components/Header";
import Routes from "./components/Routes";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <Routes />
      </Provider>
    );
  }
}

export default App;
