import React from 'react';
import { useFlashcard } from '../contexts/FlashcardContext';

function AIModal({ docId }) {
  const { flashcards } = useFlashcard();

  const flashcard = flashcards?.find(fc => fc.docID === docId);
  return (
    <div className='ai-modal'>
      <div className='ai-term-def'>
        <p>{flashcard.side1}</p>
        <p>{flashcard.side2}</p>
      </div>
      <div className='ai-exp'>
        <p>AI text</p>
      </div>
    </div>
  )
}

export default AIModal;