import React, { Component } from "react";
import { connect } from "react-redux";
import { userConstants } from "../../_constants";

import AdminView from "./AdminView";
import UserView from "./UserView";

class CVManagement extends Component {
  render() {
    const { user } = this.props;

    if (user.type === userConstants.ADMIN) {
      return (
        <div className="cv-management">
          <AdminView user={user} />
        </div>
      );
    } else if (user.type === userConstants.USER) {
      return (
        <div className="cv-management">
          <UserView user={user} />
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated,
  user: state.users.user
});

export default connect(mapStateToProps)(CVManagement);
