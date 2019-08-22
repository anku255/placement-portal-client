import React, { Component } from "react";
import { connect } from "react-redux";
import uuidV4 from "uuid/v4";
import queryString from "query-string";

import NoticeCard from "./NoticeCard";
import Pagination from "../common/Pagination/Pagination";
import DeleteNoticeModal from "./DeleteNoticeModal";
import { CenteredLoader as Loader } from "../common/Loader";
import { fetchNotices, deleteNotice } from "../../_actions";
import { userConstants } from "../../_constants";

const NoticeList = props => {
  const {
    notices,
    handleCardDeleteBtn,
    handleCardEditBtn,
    isAuthenticated,
    user
  } = props;
  const showActions = isAuthenticated && user.type === userConstants.ADMIN;
  return (
    <ul className="notice-list">
      {notices.map(notice => (
        <li key={uuidV4()}>
          <NoticeCard
            noticeId={notice._id}
            content={notice.contentMarkdown}
            deadline={notice.deadline}
            handleEdit={handleCardEditBtn}
            handleDelete={handleCardDeleteBtn}
            showActions={showActions}
          />
        </li>
      ))}
    </ul>
  );
};

class NoticePage extends Component {
  state = { currentPage: 0, isModalVisible: false, selectedNotice: null };

  componentDidMount = () => {
    const { page = 1 } = queryString.parse(this.props.location.search);
    this.setState({ currentPage: page });
    this.props.fetchNotices(page);
  };

  handlePageChange = ({ selected }) => {
    this.props.history.push(`/notice?page=${selected + 1}`);
    this.props.fetchNotices(selected + 1);
    this.setState({ currentPage: selected + 1 });
  };

  handleCardDeleteBtn = noticeId => {
    this.setState({ isModalVisible: true, selectedNotice: noticeId });
  };

  handleCardEditBtn = (noticeId, content, deadline) => {
    const dateString = deadline.slice(0, 10);

    this.props.history.push({
      pathname: `/notice/edit/${noticeId}`,
      state: {
        contentMarkdown: content,
        noticeId,
        deadline: dateString
      }
    });
  };

  hideModal = () => {
    this.setState({ isModalVisible: false });
  };

  handleModalDeleteBtn = () => {
    this.hideModal();
    this.props.deleteNotice(this.state.selectedNotice);
    this.setState({ selectedNotice: null });
  };

  render() {
    const { totalPages, loading } = this.props;

    if (loading) {
      return <Loader />;
    }

    return (
      <div className="notice-page">
        <DeleteNoticeModal
          isVisible={this.state.isModalVisible}
          handleCancel={this.hideModal}
          handleDelete={this.handleModalDeleteBtn}
        />
        <Pagination
          totalPages={totalPages}
          currentPage={this.state.currentPage - 1}
          handlePageChange={this.handlePageChange}
        />
        <NoticeList
          {...this.props}
          handleCardDeleteBtn={this.handleCardDeleteBtn}
          handleCardEditBtn={this.handleCardEditBtn}
        />
        <Pagination
          totalPages={totalPages}
          currentPage={this.state.currentPage - 1}
          handlePageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.notice.loading,
  notices: state.notice.notices,
  totalPages: state.notice.totalPages,
  isAuthenticated: state.users.isAuthenticated,
  user: state.users.user
});

export default connect(
  mapStateToProps,
  { fetchNotices, deleteNotice }
)(NoticePage);
