import React from "react";
import { connect } from "react-redux";
import Notifications from "react-notification-system-redux";

const NotificationsWrapper = ({ notifications }) => {
  return <Notifications notifications={notifications} />;
};

const mapStateToProps = state => ({
  notifications: state.notifications
});

export default connect(mapStateToProps)(NotificationsWrapper);
