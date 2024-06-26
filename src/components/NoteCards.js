import React, { useEffect, useState } from 'react';
import { useFlashcard } from '../contexts/FlashcardContext';
import Note from './Note';
import CreateCard from './CreateCard';
import Pagination from './Pagination';

function NoteCards() {
  const { flashcards } = useFlashcard();
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = flashcards.length;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

 
  return (
    <div className='note-stack'>
      {flashcards.length > 0 && (
        <Note 
          key={flashcards[currentPage].docID} 
          docId={flashcards[currentPage].docID} 
        />
        )}
        <CreateCard className="create-card"/>
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default NoteCards;