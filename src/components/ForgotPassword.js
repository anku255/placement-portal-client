import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { forgotPassword, clearUserErrors } from "../_actions";
import Input from "../components/common/form/Input";
import cx from "classnames";

class ForgotPassword extends Component {
  state = { email: "" };

  handleInputChange = e => {
    this.props.clearUserErrors();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.forgotPassword(this.state.email);
  };

  render() {
    const { isAuthenticated, errors, loading } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container forgot-password">
        <div className="title is-size-2 has-text-centered">Forgot Password</div>
        <Input
          label="Email"
          type="email"
          placeholder="Email"
          name="email"
          onChange={this.handleInputChange}
          value={this.state.email}
          errorText={errors.email}
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
  { forgotPassword, clearUserErrors }
)(ForgotPassword);
