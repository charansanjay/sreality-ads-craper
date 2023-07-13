// Dependencies Import
import React from 'react';

// CSS Import
import './pagination.scss';

// Third party libraries import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

type PaginationProps = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  paginate,
}) => {

  const pageNumbers = [];
  const displayPages = 4; // Number of pages to be displayed
  const ellipsis = '...'; // Ellipsis character

  // Calculate the starting and ending page numbers
  let startPage = Math.max(currentPage - Math.floor(displayPages / 2), 1);
  let endPage = Math.min(
    startPage + displayPages - 1,
    Math.ceil(totalItems / itemsPerPage)
  );

  // Adjust the starting page if the ending page is at the maximum
  if (endPage === Math.ceil(totalItems / itemsPerPage)) {
    startPage = Math.max(endPage - displayPages + 1, 1);
  }

  // Populate the pageNumbers array
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pagination'>
      <div className='pagination'>
        {/* Display the left arrow if not on the first page */}
        {currentPage !== 1 && (
          <button className='icon-button' onClick={() => paginate(currentPage - 1)}>
            <FontAwesomeIcon icon={faChevronLeft}/>
          </button>
        )}

        {/* Display the first page number */}
        {startPage > 1 && <button onClick={() => paginate(1)}>1</button>}

        {/* Display ellipsis if there are more pages before the first page */}
        {startPage > 2 && <span>{ellipsis}</span>}

        {/* Display the page numbers */}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}

        {/* Display ellipsis if there are more pages after the last page */}
        {endPage < Math.ceil(totalItems / itemsPerPage) - 1 && (
          <span>{ellipsis}</span>
        )}

        {/* Display the last page number */}
        {endPage < Math.ceil(totalItems / itemsPerPage) && (
          <button
            onClick={() => paginate(Math.ceil(totalItems / itemsPerPage))}
          >
            {Math.ceil(totalItems / itemsPerPage)}
          </button>
        )}

        {/* Display the right arrow if not on the last page */}
        {currentPage !== Math.ceil(totalItems / itemsPerPage) && (
          <button className='icon-button' onClick={() => paginate(currentPage + 1)}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
