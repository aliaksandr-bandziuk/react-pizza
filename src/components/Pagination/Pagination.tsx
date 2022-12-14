import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  onChangePage: any;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={event => onChangePage(event.selected + 1)}
      pageRangeDisplayed={6}
      pageCount={2}
      forcePage={currentPage - 1}
      previousLabel="<"
      // renderOnZeroPageCount={null}
    />
  )
}

export default Pagination;