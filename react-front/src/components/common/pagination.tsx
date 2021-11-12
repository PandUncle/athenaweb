import React from 'react';
import { Link } from 'umi';

// {
//     "page": 1,
//     "limit": 15,
//     "pages": 2,
//     "total": 17,
//     "next": 2,
//     "prev": null
// }

const Pagination = (props: any) => {
  const { page, pages } = props;
  let previousPagePath = '#';
  let nextPagePath = '#';
  let humanPageNumber = page;
  let numberOfPages = pages;

  return (
    <nav className="pagination" role="navigation">
      <div>
        {previousPagePath && (
          <Link to={previousPagePath} rel="prev">
            Previous
          </Link>
        )}
      </div>
      {numberOfPages > 1 && (
        <div className="pagination-location">
          Page {humanPageNumber} of {numberOfPages}
        </div>
      )}
      <div>
        {nextPagePath && (
          <Link to={nextPagePath} rel="next">
            Next
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
