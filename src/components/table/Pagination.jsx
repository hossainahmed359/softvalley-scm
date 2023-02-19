import React from "react";
import ReactPaginate from 'react-paginate';

const Pagination = ({ current, total, onChange, pageSize }) => {
  return (
    <nav aria-label="..." className="d-flex justify-content-between flex-wrap">
      <div>
        <PageSize pageSize={pageSize} onChange={onChange} total={total} />
      </div>
      <PaginatedItems
        current={current}
        pagesCount={pageSize ? Math.ceil(total / pageSize) : 1}
        pageSize={pageSize}
        onChange={onChange}
      />
    </nav>
  );
};

export default Pagination;

// PAGE SIZE
export const PageSize = ({ pageSize, onChange, total }) => {
  return (
    <div className="dataTable-dropdown ">
      <span className='mx-2'>Show</span>
      <label>
        <select className="dataTable-selector" name='pageSizeValue'
          onChange={(e) => {
            onChange(1, parseInt(e.target.value));
          }}
          value={pageSize}
        >
          <option value={10} selected="">
            10
          </option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          {/* <option value={0}>All</option> */}
        </select>{" "}
      </label>
      <span className='mx-2'>of {total} items</span>
    </div>
  )
}

// PAGINATION
export const PaginatedItems = ({ pagesCount, current, pageSize, onChange }) => {
  return (
    <div className='custom-react-pagination'>
      <ReactPaginate
        className='pagination pagination-sm'
        nextLabel={'Next'}
        onPageChange={(e) => {
          onChange(e.selected + 1, pageSize);
        }}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pagesCount}
        previousLabel={'Previous'}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        forcePage={parseInt(current) - 1}
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination-container mb-0"
        activeClassName="active"
      />
    </div>
  )
}
