import React from "react";

export const Pagination = ({
  banksPerPage,
  totalBanks,
  paginate,
  currentSelectedPage,
  loading
}) => {
  if (loading) return <h4 className="m-4">Loading...</h4>;
  else {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalBanks / banksPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav className="m-5">
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li
              key={number}
              className={
                number === currentSelectedPage
                  ? "page-item active"
                  : "page-item"
              }
            >
              <a onClick={() => paginate(number)} className="page-link">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
};
