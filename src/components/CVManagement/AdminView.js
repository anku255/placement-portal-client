import React, { Component } from "react";
import { connect } from "react-redux";
import BatchYearSelect from "../common/form/BatchYearSelect";
import Input from "../common/form/Input";
import cx from "classnames";
import { fetchCVByRegNo, fetchAllCV } from "../../_actions";

class AdminView extends Component {
  state = {
    regNo: "",
    batchYear: new Date().getFullYear().toString(),
    errors: {}
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

  render() {
    // TODO:
    const { fetchingCV } = this.props;
    return (
      <div className="cv-admin-view">
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

        <div className="get-all-cv">
          <BatchYearSelect
            handleInputChange={this.handleInputChange}
            value={this.state.batchYear}
          />
          <button
            className={cx("button is-primary", { "is-loading": fetchingCV })}
            onClick={() => this.props.fetchAllCV(this.state.batchYear)}
          >
            Get All CVs 
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetchingCV: state.cv.fetchingCV
});

export default connect(
  mapStateToProps,
  { fetchCVByRegNo, fetchAllCV }
)(AdminView);
