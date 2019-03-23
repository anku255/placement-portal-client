import React, { Component } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { FaUpload } from "react-icons/fa";
import { uploadCV } from "../../_actions";

class UploadCVForm extends Component {
  state = { cvFile: null };

  handleOnChange = e => {
    this.setState({ cvFile: e.target.files[0] });
  };

  handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", this.state.cvFile);
    this.props.uploadCV(formData, this.props.history);
  };

  render() {
    const btnClass = cx("button is-primary", {
      "is-loading": this.props.uploading
    });

    return (
      <div className="upload-cv-container">
        <h2 className="title is-3">Upload CV</h2>
        <div className="file has-name is-boxed is-danger is-centered">
          <form encType="multipart/form-data">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                accept="application/pdf"
                onChange={this.handleOnChange}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <FaUpload />
                </span>
                <span className="file-label">Choose a file…</span>
              </span>
              <span className="file-name">
                {this.state.cvFile && this.state.cvFile.name}
              </span>
            </label>
          </form>
        </div>
        <button className={btnClass} onClick={this.handleSubmit}>
          Upload
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uploading: state.cv.uploading
});

export default connect(
  mapStateToProps,
  { uploadCV }
)(UploadCVForm);
