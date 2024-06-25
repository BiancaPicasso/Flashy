import React, { useState } from 'react';
import { useFlashcard } from '../contexts/FlashcardContext';
import NoteModal from './NoteModal';

const CreateCard = () => {
  const { flashcards, setFlashcards } = useFlashcard();
  const [showModal, setShowModal] = useState(false);

  const handleSave = (docID, newCard) => {
    setFlashcards([...flashcards, { docID, ...newCard }]);
    setShowModal(false);
  };

  return (
    <div>
      <button 
        type='button' 
        onClick={() => setShowModal(true)}
        className='create-note-button'
      >
        +
      </button>
      {showModal && (
        <>
          <div className="overlay" onClick={() => setShowModal(false)}></div>
          <NoteModal 
            mode="create" 
            onClose={() => setShowModal(false)} 
            onSave={handleSave} 
          />
        </>
      )}
    </div>
  );
};

export default CreateCard;
