import React, { useState, useEffect } from 'react';
import { useFlashcard } from '../contexts/FlashcardContext';
import { fetchExplanation } from '../utils/openai';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';

function AIModal({ docId, onClose }) {
  const { flashcards } = useFlashcard();
  const [explanation, setExplanation] = useState('')

  const flashcard = flashcards?.find(fc => fc.docID === docId);

  useEffect(() => {
    const getExplanation = async () => {
      if (flashcard) {
        try {
          const explanationText = await fetchExplanation(flashcard.side1);
          setExplanation(explanationText);
        } catch (error) {
          setExplanation("Error fetching explanation. Please try again later.");
        }
      }
    };
    getExplanation();
  }, [flashcard]);

  return (
    <div className='overlay' onClick={onClose}>
      <div className='ai-modal' onClick={e => e.stopPropagation()}>
        <button type="button" className='modal-exit-button' onClick={onClose}>×</button>
        <div className='ai-term-def'>
          <p className='ai-modal-term bold'>{flashcard.side1}</p>
          <p className='ai-modal-def'>{flashcard.side2}</p>
        </div>
        <div className='ai-section'>
          <p className='explain-ai' >
            <span className='bold margin-right-10 explain'>Explained By AI</span>
            <AutoAwesomeOutlinedIcon className='explain-icon' />
          </p>
          <p className='ai-exp'>{explanation || 'Loading...'}</p>
        </div>
      </div>
    </div>
  );
}

export default AIModal;