import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...restProps }) => (
  <Route
    {...restProps}
    render={props => {
      return restProps.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      );
    }}
  />
);

const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated,
  user: state.users.user
});

export default connect(mapStateToProps)(PrivateRoute);
