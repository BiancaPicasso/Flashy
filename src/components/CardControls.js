import React, { useState } from 'react';
import NoteModal from './NoteModal';
import { useFlashcard } from '../contexts/FlashcardContext';
import EditIcon from '@mui/icons-material/Edit';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star'

function CardControls({ docId }) {
  const { flashcards, setFlashcards } = useFlashcard();
  const flashcard = flashcards?.find(fc => fc.docID === docId);
  const [starred, setStarred] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = (e) => {
    e.stopPropagation();
    setShowModal(true);
  }
  const handleSpeakClick = (e) => {
    e.stopPropagation();
    console.log('hi');
  }
  const handleStarClick = (e) => {
    e.stopPropagation();
    setStarred(prevStar => !prevStar)
  }

  const handleExitModal = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setShowModal(prevShowModal => !prevShowModal);
  }

  const handleUpdate = (id, updatedCard) => {
    const updatedFlashcards = flashcards.map(fc =>
      fc.docID === id ? { ...fc, ...updatedCard } : fc
    );
    setFlashcards(updatedFlashcards);
    setShowModal(false);
  };

  return (
    <div className={`card-controls-wrapper ${showModal ? 'faded' : ''}`}>
      <div className='card-controls'>
        <EditIcon className='edit-icon' onClick={handleEditClick} />
        <VolumeUpIcon className='speak-icon' onClick={handleSpeakClick} />
        {starred ? <StarIcon className='star-icon' onClick={handleStarClick} /> : <StarBorderIcon className='star-border-icon' onClick={handleStarClick} />}
      </div>
      {showModal && (
        <>
          <div className="overlay" onClick={handleExitModal}></div>
          <NoteModal
            mode="edit"
            docId={docId}
            initialData={flashcard}
            onClose={() => setShowModal(false)}
            onSave={handleUpdate}
          />
        </>
      )}
    </div>
  );
}

export default CardControls; 