import React, { Component } from "react";
import { connect } from "react-redux";
import uuidV4 from "uuid/v4";
import queryString from "query-string";

import NoticeCard from "./NoticeCard";
import Pagination from "../common/Pagination/Pagination";
import { CenteredLoader as Loader } from "../common/Loader";
import { fetchNotices } from "../../_actions";

const NoticeList = ({ notices }) => {
  return (
    <ul className="notice-list">
      {notices.map(notice => (
        <li key={uuidV4()}>
          <NoticeCard
            content={notice.contentMarkdown}
            deadline={notice.deadline}
            handleEdit={() => alert("Edit clicked!")}
            handleDelete={() => alert("Delete clicked!")}
          />
        </li>
      ))}
    </ul>
  );
};

class NoticePage extends Component {
  state = { currentPage: 0 };

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

  render() {
    const { notices, totalPages, loading } = this.props;

    if (loading) {
      return <Loader />;
    }

    return (
      <div className="notice-page">
        <Pagination
          totalPages={totalPages}
          currentPage={this.state.currentPage - 1}
          handlePageChange={this.handlePageChange}
        />
        <NoticeList notices={notices} />
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
  totalPages: state.notice.totalPages
});

export default connect(
  mapStateToProps,
  { fetchNotices }
)(NoticePage);
