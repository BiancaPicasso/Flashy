import React, { useState } from 'react';
import { useFlashcard } from '../contexts/FlashcardContext';
import CardControls from './CardControls';


function Note ({ docId }) {
  const { flashcards } = useFlashcard();
  const [front, setFront] = useState(true);
  
  const flashcard = flashcards?.find(fc => fc.docID === docId);

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