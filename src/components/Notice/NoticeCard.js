import React from "react";
import PropTypes from "prop-types";
import Markdown from "markdown-to-jsx";
import cx from "classnames";

const isFutureDate = date => {
  return new Date(date).getTime() >= new Date().getTime();
};

function NoticeCard(props) {
  return (
    <div
      className={cx("card notice-card", {
        "is-active": isFutureDate(props.deadline)
      })}
    >
      <div className="card-content">
        <Markdown>{props.content}</Markdown>
      </div>
      {props.showActions ? (
        <footer className="card-footer">
          <p className="card-footer-item">
            <button className="button is-warning" onClick={props.handleEdit}>
              Edit
            </button>
          </p>
          <p className="card-footer-item">
            <button
              className="button is-danger"
              onClick={() => props.handleDelete(props.noticeId)}
            >
              Delete
            </button>
          </p>
        </footer>
      ) : null}
    </div>
  );
}

NoticeCard.propTypes = {
  noticeId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

NoticeCard.defaultProps = {
  showActions: false
};

export default NoticeCard;
