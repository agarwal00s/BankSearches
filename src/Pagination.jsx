import React from "react";

export const Pagination = ({ banksPerPage, totalBanks, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalBanks / banksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="m-5">
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
