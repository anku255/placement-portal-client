import React, { Component } from "react";
import { connect } from "react-redux";

import NoticeForm from "./NoticeForm";
import { editNotice } from "../../_actions";

class EditNoticePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noticeId: props.location.state.noticeId,
      contentMarkdown: props.location.state.contentMarkdown,
      deadline: props.location.state.deadline
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    const editData = {
      contentMarkdown: this.state.contentMarkdown,
      deadline: this.state.deadline
    };
    this.props.editNotice(this.state.noticeId, editData, this.props.history);
  };

  render() {
    const { contentMarkdown, deadline } = this.state;
    return (
      <NoticeForm
        contentMarkdown={contentMarkdown}
        deadline={deadline}
        addingNotice={this.props.addingNotice}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  addingNotice: state.notice.addingNotice
});

export default connect(
  mapStateToProps,
  { editNotice }
)(EditNoticePage);
