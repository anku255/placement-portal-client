import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../_actions";
import Input from "../components/common/form/Input";
import cx from "classnames";

class Register extends Component {
  state = {
    email: "",
    name: "",
    password: "",
    batchYear: new Date().getFullYear(),
    regNo: ""
  };

  handleInputChange = e => {
    console.log("e.target", e.target);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSumbit = e => {
    e.preventDefault();
    this.props.registerUser(this.state, this.props.history);
  };

  BatchYearSelect = () => {
    const currentYear = new Date().getFullYear();
    return (
      <div className="field">
        <label className="label">Batch Year</label>
        <div className="control">
          <div className="select">
            <select name="batchYear" onChange={this.handleInputChange}>
              <option>{currentYear}</option>
              <option>{currentYear + 1}</option>
              <option>{currentYear + 2}</option>
              <option>{currentYear + 3}</option>
              <option>{currentYear + 4}</option>
            </select>
          </div>
          <p className="help is-danger">{this.props.errors.batchYear}</p>
        </div>
      </div>
    );
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
        <this.BatchYearSelect />
        <Input
          label="Registration Number"
          type="number"
          placeholder="0000111"
          name="regNo"
          onChange={this.handleInputChange}
          value={this.state.regNo}
          errorText={errors.regNo}
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
