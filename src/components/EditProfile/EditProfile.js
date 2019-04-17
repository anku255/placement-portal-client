import React, { Component } from "react";
import { connect } from "react-redux";
import { editProfile } from "../../_actions";
import Input from "../common/form/Input";
import BatchYearSelect from "../common/form/BatchYearSelect";
import cx from "classnames";

// helper functions
const getPaddedRegNo = regNo => {
  const maxPrefixZeroes = "000000";
  const prefixZeroesLength = 7 - regNo.toString().length;
  const prefixZeroes = maxPrefixZeroes.slice(0, prefixZeroesLength);
  return `${prefixZeroes}${regNo}`;
};

class EditProfile extends Component {
  state = {
    email: this.props.user.email,
    name: this.props.user.name,
    batchYear: this.props.user.batchYear.toString(),
    regNo: getPaddedRegNo(this.props.user.regNo)
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSumbit = e => {
    e.preventDefault();
    this.props.editProfile(this.state);
  };

  render() {
    const { errors, loading } = this.props;
    return (
      <div className="container edit-profile">
        <div className="title is-size-2 has-text-centered">Edit Profile</div>
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
        <BatchYearSelect
          handleInputChange={this.handleInputChange}
          errorText={errors.batchYear}
          value={this.state.batchYear}
        />
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
  loading: state.users.loading,
  user: state.users.user
});

export default connect(
  mapStateToProps,
  { editProfile }
)(EditProfile);
