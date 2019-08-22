import React, { Component } from "react";
import { connect } from "react-redux";

import NoticeForm from "./NoticeForm";
import { addNotice } from "../../_actions";

class AddNoticePage extends Component {
  state = {
    contentMarkdown: "",
    deadline: ""
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    this.props.addNotice(this.state, this.props.history);
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
  { addNotice }
)(AddNoticePage);
