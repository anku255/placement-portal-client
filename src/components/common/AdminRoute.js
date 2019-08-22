import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { userConstants } from "../../_constants";

const AdminRoute = ({ component: Component, ...restProps }) => (
  <Route
    {...restProps}
    render={props => {
      return restProps.isAuthenticated === true &&
        restProps.user.type === userConstants.ADMIN ? (
        <Component {...props} />
      ) : (
        <div className="container">
          <div className="title has-text-centered">
            You do not have permissions to view this page.
          </div>
        </div>
      );
    }}
  />
);

const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated,
  user: state.users.user
});

export default connect(mapStateToProps)(AdminRoute);
