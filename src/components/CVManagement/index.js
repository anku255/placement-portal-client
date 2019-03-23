import React, { Component } from "react";
import { connect } from "react-redux";
import { userConstants } from "../../_constants";

import AdminView from "./AdminView";
import UserView from "./UserView";

class CVManagement extends Component {
  render() {
    const { user } = this.props;

    if (user.type === userConstants.ADMIN) {
      return <AdminView />;
    } else if (user.type === userConstants.USER) {
      return <UserView />;
    }

    return null;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated,
  user: state.users.user
});

export default connect(mapStateToProps)(CVManagement);
