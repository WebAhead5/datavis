import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate, setDisplayedRows }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  
  return (
      <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
            <li key={number} className="page-item ml-2">
            <a
            
              onClick={() => {
                const newDisplayedRows = postsPerPage * number;  
                // paginate(number)
                setDisplayedRows(newDisplayedRows)}}
            //   href="!#"
              style={{ color: "#47567d" }}
              className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
