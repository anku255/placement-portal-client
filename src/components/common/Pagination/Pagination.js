import React from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

const PrevButton = () => {
  return (
    <>
      <span className="is-big">⬅ Previous</span>
      <span className="is-small">⬅</span>
    </>
  );
};
const NextButton = () => {
  return (
    <>
      <span className="is-big">Next ➡</span>
      <span className="is-small">➡</span>
    </>
  );
};

function Pagination(props) {
  const { currentPage, totalPages, handlePageChange } = props;
  return (
    <div className="paginate">
      <ReactPaginate
        previousLabel={<PrevButton />}
        nextLabel={<NextButton />}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"react-pagination"}
        activeClassName={"active"}
        forcePage={currentPage}
      />
    </div>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired
};

export default Pagination;
