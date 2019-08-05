import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../_actions";
import { Link } from "react-router-dom";
import Input from "../components/common/form/Input";
import cx from "classnames";

class Login extends Component {
  state = { email: "", password: "" };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSumbit = e => {
    e.preventDefault();
    this.props.loginUser(this.state, this.props.history);
  };

  render() {
    const { errors, loading } = this.props;
    return (
      <div className="container login">
        <div className="title is-size-2 has-text-centered">Login</div>
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
        <div className="field">
          <div className="control forgot-password-link">
            <Link to="/forgot">Forgot Password?</Link>
          </div>
        </div>
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

//
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
