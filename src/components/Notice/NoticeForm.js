import React from "react";
import PropTypes from "prop-types";
import Markdown from "markdown-to-jsx";
import cx from "classnames";

import TextArea from "../common/form/TextArea";
import Input from "../common/form/Input";

function NoticeForm(props) {
  return (
    <div className="container notice-form">
      <div className="columns">
        <div className="column">
          <TextArea
            name="contentMarkdown"
            label="Notice Content"
            placeholder="Type your notice here"
            helpText="*Markdown is supported"
            rows="4"
            value={props.contentMarkdown}
            onChange={props.handleInputChange}
          />
        </div>
        <div className="column">
          <div className="preview-label">Notice Preview</div>
          <div className="preview">
            <Markdown>{props.contentMarkdown}</Markdown>
          </div>
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <Input
            name="deadline"
            type="date"
            label="Deadline"
            value={props.deadline}
            onChange={props.handleInputChange}
          />
        </div>
        <div className="column">
          <div className="submit-btn">
            <button
              className={cx("button is-primary", {
                "is-loading": props.addingNotice
              })}
              onClick={props.handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

NoticeForm.propTypes = {
  contentMarkdown: PropTypes.string,
  deadline: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  addingNotice: PropTypes.bool
};

export default NoticeForm;
