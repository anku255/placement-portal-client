import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import store from "./store/store";
import Header from "./components/Header";

const HelloWorld = () => <div>Hello, World!</div>;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <BrowserRouter>
          <Route path="/" exact component={HelloWorld} />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
