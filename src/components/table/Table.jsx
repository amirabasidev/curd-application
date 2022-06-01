import { useState } from "react";
import ReactPaginate from "react-paginate";

import Spinner from "../UI/spinner/Spinner";

import classes from "./table.module.css";

const Table = ({ headData, bodyData, renderBody, loading }) => {
  const [currentPage, setCurrentPage] = useState(5);

  const countPage = bodyData.length / 5;
  const bodyDataCurrent = bodyData.slice(currentPage - 5, currentPage);

  const handlePageClick = (data) => {
    const currentPage = (data.selected + 1) * 5;
    setCurrentPage(currentPage);
  };

  return (
    <div className={classes.table__wrapper}>
      <table className={classes.table}>
        {headData && (
          <thead>
            <tr>
              {headData.map((item, key) => (
                <th key={key}>{item}</th>
              ))}
            </tr>
          </thead>
        )}
        {bodyData && renderBody && !loading && (
          <tbody>
            {bodyDataCurrent.map((item, index) => renderBody(item, index))}
          </tbody>
        )}
      </table>
      {loading && <Spinner minHeight="180px" />}
      {bodyData.length > 0 && (
        <ReactPaginate
          previousLabel="previous"
          nextLabel="next"
          breakLabel="..."
          pageCount={countPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={classes.table__pagination}
          pageLinkClassName={classes.table__pagination_item}
          previousLinkClassName={classes.table__pagination_item}
          nextLinkClassName={classes.table__pagination_item}
          breakLinkClassName={classes.table__pagination_item}
          activeClassName={classes.table__pagination_item_active}
        />
      )}
    </div>
  );
};

export default Table;
