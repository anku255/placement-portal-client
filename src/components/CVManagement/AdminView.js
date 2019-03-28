import React, { Component } from "react";
import { connect } from "react-redux";
import BatchYearSelect from "../common/form/BatchYearSelect";
import Input from "../common/form/Input";
import UsersTable from "./UsersTable";
import cx from "classnames";
import {
  fetchCVByRegNo,
  fetchAllCV,
  fetchAllUsersWithCV
} from "../../_actions";

class AdminView extends Component {
  state = {
    regNo: "",
    batchYear: new Date().getFullYear().toString(),
    errors: {},
    showUsersTable: false
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fetchCVByRegNo = e => {
    e.preventDefault();
    const { batchYear, regNo } = this.state;
    const errors = {};
    if (regNo.length !== 7) {
      errors.regNo = "Please enter 7 digit Registration No.";
      return this.setState({ errors });
    }

    this.setState({ errors });
    this.props.fetchCVByRegNo(batchYear, regNo);
  };

  fetchAllUsersWithCV = () => {
    this.setState({ showUsersTable: true });
    this.props.fetchAllUsersWithCV(this.state.batchYear);
  };

  DownloadCV = () => {
    const { fetchingCV, fetchingUsers } = this.props;
    return (
      <>
        <div className="title is-size-2">Download CV</div>
        <div className="column">
          <div className="get-single-cv">
            <BatchYearSelect
              handleInputChange={this.handleInputChange}
              value={this.state.batchYear}
            />
            <Input
              label="Registration Number"
              type="number"
              placeholder="0000111"
              name="regNo"
              onChange={this.handleInputChange}
              value={this.state.regNo}
              errorText={this.state.errors.regNo}
            />
            <button
              className={cx("button is-primary", { "is-loading": fetchingCV })}
              onClick={this.fetchCVByRegNo}
            >
              Get CV
            </button>
          </div>
        </div>

        <div className="column">
          <div className="get-all-cv">
            <BatchYearSelect
              handleInputChange={this.handleInputChange}
              value={this.state.batchYear}
            />
            <button
              className={cx("button is-info", { "is-loading": fetchingUsers })}
              onClick={this.fetchAllUsersWithCV}
            >
              Get Users
            </button>
            <button
              className={cx("button is-primary", { "is-loading": fetchingCV })}
              onClick={() => this.props.fetchAllCV(this.state.batchYear)}
            >
              Get All CVs
            </button>
          </div>
        </div>
      </>
    );
  };

  render() {
    return (
      <>
        <div className="cv-admin-view columns">
          <this.DownloadCV />
        </div>

        {this.state.showUsersTable ? (
          <div className="users-table-container">
            <UsersTable users={this.props.usersWithCV} />
          </div>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = state => ({
  fetchingCV: state.cv.fetchingCV,
  fetchingUsers: state.cv.fetchingUsers,
  usersWithCV: state.cv.usersWithCV
});

export default connect(
  mapStateToProps,
  { fetchCVByRegNo, fetchAllCV, fetchAllUsersWithCV }
)(AdminView);
