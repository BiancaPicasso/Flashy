import React from 'react';
import { useFlashcard } from '../contexts/FlashcardContext';
import Note from './Note';

function NoteCards() {
  const { flashcards } = useFlashcard();

  return (
    <div>
      {flashcards.map((flashcard) => (
        <Note 
          key={flashcard.docID} 
          docId={flashcard.docID} 
          side1={flashcard.side1} 
          side2={flashcard.side2} 
        />
      ))}
    </div>
  );
}

export default NoteCards;