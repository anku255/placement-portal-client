import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserView extends Component {
  HasUploadedCV = () => {
    return (
      <div className="cv-user-view">
        <Link to="/cv/upload" className="button is-primary">
          Update CV
        </Link>
        <div className="button is-info">View CV</div>
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

export default UserView;
