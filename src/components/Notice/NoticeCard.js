import React from "react";
import PropTypes from "prop-types";
import Markdown from "markdown-to-jsx";
import cx from "classnames";

const isFutureDate = date => {
  return date.getTime() >= new Date().getTime();
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
      <footer className="card-footer">
        <p className="card-footer-item">
          <button className="button is-warning" onClick={props.handleEdit}>
            Edit
          </button>
        </p>
        <p className="card-footer-item">
          <button className="button is-danger" onClick={props.handleDelete}>
            Delete
          </button>
        </p>
      </footer>
    </div>
  );
}

NoticeCard.propTypes = {
  content: PropTypes.string.isRequired,
  deadline: PropTypes.object.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default NoticeCard;
