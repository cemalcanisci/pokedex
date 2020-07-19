import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

export default class Paginate extends Component {
  constructor(props) {
    super(props);
    this.state = { pageNumber: 0 };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { page } = nextProps;
    const pre = page - 1;
    const next = (prevState.pageNumber);
    if (pre !== next) {
      return {
        pageNumber: pre,
      };
    }
    return null;
  }

  render() {
    const {
      total, limit, handlePageClick,
    } = this.props;
    const { pageNumber } = this.state;
    return (
      <div className="mb-3 d-flex flex-column align-items-center justify-content-center">

        <ReactPaginate
          pageCount={Math.ceil(total / limit)}
          previousLabel="Prev"
          nextLabel="Next"
          breakLabel="..."
          breakClassName="breaked"
          marginPagesDisplayed={3}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
          forcePage={pageNumber}
        />
        <strong>
          Total Pokemon Count :
          <span className="text-danger">
            {total}
          </span>
        </strong>
      </div>
    );
  }
}
