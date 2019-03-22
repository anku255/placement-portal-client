import React, { Component } from "react";

import Input from "../components/common/form/Input";

class Register extends Component {
  state = { email: "", name: "", password: "" };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSumbit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="container register">
        <div className="title is-size-2 has-text-centered">Sign up</div>
        <Input
          label="Name"
          type="name"
          placeholder="Name"
          name="name"
          onChange={this.handleInputChange}
        />
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

export default Register;
