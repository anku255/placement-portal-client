import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { resetPassword, clearUserErrors } from "../_actions";
import Input from "../components/common/form/Input";
import cx from "classnames";

class ResetPassword extends Component {
  state = {
    password: "",
    confirmPassword: "",
    confirmPasswordError: "",
    token: ""
  };

  componentDidMount = () => {
    this.setState({ token: this.props.match.params.token });
  };

  handleInputChange = e => {
    this.props.clearUserErrors();
    this.setState({ confirmPasswordError: "" });

    if (e.target.name === "confirmPassword") {
      if (e.target.value !== this.state.password) {
        this.setState({
          confirmPasswordError: "Passwords do not match"
        });
      } else {
        this.setState({ confirmPasswordError: "" });
      }
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { password, confirmPassword, token } = this.state;
    if (confirmPassword.length <= 0) {
      this.setState({
        confirmPasswordError: "Please re-enter your password"
      });

      if (password.length > 0) return;
    }
    this.props.resetPassword(password, token, this.props.history);
  };

  render() {
    const { isAuthenticated, errors, loading } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container reset-password">
        <div className="title is-size-2 has-text-centered">Reset Password</div>
        <Input
          label="Password"
          type="password"
          placeholder="Password"
          name="password"
          onChange={this.handleInputChange}
          value={this.state.password}
          errorText={errors.password}
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={this.handleInputChange}
          value={this.state.confirmPassword}
          errorText={this.state.confirmPasswordError}
        />
        <button
          className={cx("button is-primary", { "is-loading": loading })}
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated,
  errors: state.users.errors,
  loading: state.users.loading
});

//
export default connect(
  mapStateToProps,
  { resetPassword, clearUserErrors }
)(ResetPassword);
