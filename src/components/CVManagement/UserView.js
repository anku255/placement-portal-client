import React, { Component } from "react";
import cx from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCV } from "../../_actions";

class UserView extends Component {
  HasUploadedCV = () => {
    const { fetchCV, fetchingCV } = this.props;
    return (
      <div className="cv-user-view">
        <Link to="/cv/upload" className="button is-primary">
          Update CV
        </Link>
        <div
          onClick={fetchCV}
          className={cx("button is-info", { "is-loading": fetchingCV })}
        >
          View CV
        </div>
      </div>
    );
  };

  YetToUploadCV = () => {
    return (
      <div className="cv-user-view">
        <Link to="/cv/upload" className="button is-primary">
          Upload CV
        </Link>
      </div>
    );
  };

  render() {
    const { user } = this.props;
    if (user.hasUploadedCV) {
      return <this.HasUploadedCV />;
    }
    return <this.YetToUploadCV />;
  }
}

const mapStateToProps = state => ({
  fetchingCV: state.cv.fetchingCV
});

export default connect(
  mapStateToProps,
  { fetchCV }
)(UserView);
