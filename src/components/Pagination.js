import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrevPage = () => {
    onPageChange(Math.max(currentPage - 1, 0));
  };

  const handleNextPage = () => {
    onPageChange(Math.min(currentPage + 1, totalPages - 1));
  };


  return (
    <div className='pagination'>
      <button type="button" onClick={handlePrevPage} disabled={currentPage === 0}>-</button>
      <p>{currentPage + 1}/{totalPages}</p>
      <button type="button" onClick={handleNextPage}disabled={currentPage === totalPages - 1}>+</button>
    </div>
  );
};

export default Pagination;