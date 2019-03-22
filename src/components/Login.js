import React, { Component } from "react";

import Input from "../components/common/form/Input";

class Login extends Component {
  state = { email: "", password: "" };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSumbit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="container login">
        <div className="title is-size-2 has-text-centered">Login</div>
        <Input
          label="Email"
          type="email"
          placeholder="Email"
          name="email"
          onChange={this.handleInputChange}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Password"
          name="password"
          onChange={this.handleInputChange}
        />
        <button className="button is-primary" onClick={this.handleSumbit}>
          Submit
        </button>
      </div>
    );
  }
}

export default Login;
