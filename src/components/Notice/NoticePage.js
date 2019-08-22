import React, { Component } from "react";
import uuidV4 from "uuid/v4";

import NoticeCard from "./NoticeCard";
import Pagination from "../common/Pagination/Pagination";

const noticesData = [
  {
    deadline: new Date("2019/08/28"),
    contentMarkdown:
      "# Cisco Technologies Google Form <br/> \n **Deadline:** 28th August, 2019 <br/> **Expected CTC:** 7-9 Lacs <br/> **Link to Google Form:** [Click Here](https://google.com/)"
  },
  {
    deadline: new Date("2019/08/10"),
    contentMarkdown:
      "# Kuliza Systems Google Form <br/> \n**Deadline:** 24th August, 2019 <br/> **Expected CTC:** 7-9 Lacs <br/> **Link to Google Form:** [Click Here](https://google.com/)"
  }
];

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
  render() {
    return (
      <div className="notice-page">
        <Pagination
          totalPages={10}
          currentPage={3}
          handlePageChange={({ selected }) => alert(selected + 1)}
        />
        <NoticeList notices={noticesData} />
        <Pagination
          totalPages={10}
          currentPage={3}
          handlePageChange={({ selected }) => alert(selected + 1)}
        />
      </div>
    );
  }
}

export default NoticePage;
