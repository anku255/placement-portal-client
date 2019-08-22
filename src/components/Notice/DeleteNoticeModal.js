import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

function DeleteNoticeModal(props) {
  return (
    <div className={cx("modal", { "is-active": props.isVisible })}>
      <div className="modal-background" />
      <div className="modal-content">
        <div className="card">
          <div className="card-content">
            <p className="title has-text-centered">
              Are you sure you want to delete this notice?
            </p>
          </div>
          <footer className="card-footer">
            <p className="card-footer-item">
              <button
                className="button is-warning"
                onClick={props.handleCancel}
              >
                Cancel
              </button>
            </p>
            <p className="card-footer-item">
              <button className="button is-danger" onClick={props.handleDelete}>
                Delete
              </button>
            </p>
          </footer>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={props.handleCancel}
      />
    </div>
  );
}

DeleteNoticeModal.propTypes = {
  isVisible: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleDelete: PropTypes.func
};

DeleteNoticeModal.defaultProps = {
  isVisible: false
};

export default DeleteNoticeModal;
