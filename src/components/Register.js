import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../_actions";
import Input from "../components/common/form/Input";
import cx from "classnames";

class Register extends Component {
  state = { email: "", name: "", password: "" };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSumbit = e => {
    e.preventDefault();
    this.props.registerUser(this.state, this.props.history);
  };

  render() {
    const { errors, loading } = this.props;
    return (
      <div className="container register">
        <div className="title is-size-2 has-text-centered">Sign up</div>
        <Input
          label="Name"
          type="name"
          placeholder="Name"
          name="name"
          onChange={this.handleInputChange}
          value={this.state.name}
          errorText={errors.name}
        />
        <Input
          label="Email"
          type="email"
          placeholder="Email"
          name="email"
          onChange={this.handleInputChange}
          value={this.state.email}
          errorText={errors.email}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Password"
          name="password"
          onChange={this.handleInputChange}
          value={this.state.password}
          errorText={errors.password}
        />
        <button
          className={cx("button is-primary", { "is-loading": loading })}
          onClick={this.handleSumbit}
        >
          Submit
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.users.errors,
  loading: state.users.loading
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
