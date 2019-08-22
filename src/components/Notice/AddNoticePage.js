import React, { Component } from "react";
import Markdown from "markdown-to-jsx";
import cx from "classnames";

import TextArea from "../common/form/TextArea";
import Input from "../common/form/Input";

class AddNoticePage extends Component {
  state = {
    contentMarkdown: "",
    deadline: ""
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="container add-notice-page">
        <div className="columns">
          <div className="column">
            <TextArea
              name="contentMarkdown"
              label="Notice Content"
              placeholder="Type your notice here"
              helpText="*Markdown is supported"
              rows="4"
              value={this.state.contentMarkdown}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="column">
            <div className="preview-label">Notice Preview</div>
            <div className="preview">
              <Markdown>{this.state.contentMarkdown}</Markdown>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <Input
              name="deadline"
              type="date"
              label="Deadline"
              value={this.state.deadline}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="column">
            <div className="submit-btn">
              <button className={cx("button is-primary")}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddNoticePage;
