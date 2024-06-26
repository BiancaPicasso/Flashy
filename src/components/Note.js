import React, { useState } from 'react';
import CardControls from './CardControls';
import { useFlashcard } from '../contexts/FlashcardContext';

function Note ({ docId }) {
  const { flashcards } = useFlashcard();
  const flashcard = flashcards?.find(fc => fc.docID === docId);
  const [front, setFront] = useState(true);

  if (!flashcard) return null;

  const handleCardClick = (e) => {
    if (e.target.closest('.notecard')) {
      setFront(!front);
    }
  };

  return (
    <div className="notecard" onClick={handleCardClick}>
      <CardControls docId={docId} front={front}/>
      {front ? <p>{flashcard.side1}</p> : <p>{flashcard.side2}</p>}
    </div>
  );
}

export default Note;