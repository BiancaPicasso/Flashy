import React, { useState } from 'react';
import { useFlashcard } from '../contexts/FlashcardContext';
import EditNoteModal from './EditNoteModal';
import EditIcon from '@mui/icons-material/Edit';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star'

function CardControls({ docId }) {
  const { flashcards, setFlashcards } = useFlashcard();
  const flashcard = flashcards?.find(fc => fc.docID === docId);
  const [starred, setStarred] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [question, setQuestion] = useState(flashcard.side1);
  const [answer, setAnswer] = useState(flashcard.side2);

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

  const handleUpdate = (id, updateData) => {
    if (id === docId) {
      setQuestion(updateData.side1);
      setAnswer(updateData.side2);

      // Update the flashcards in context
      const updatedFlashcards = flashcards.map(fc =>
        fc.docID === id ? { ...fc, side1: updateData.side1, side2: updateData.side2 } : fc
      );
      setFlashcards(updatedFlashcards);
    }
  };

  return (
    <div>
    <div className='card-controls'>
      <EditIcon className='edit-icon' onClick={handleEditClick} />
      <VolumeUpIcon className='speak-icon' onClick={handleSpeakClick}/>
      {starred ? <StarIcon className='star-icon' onClick={handleStarClick}/> : <StarBorderIcon className='star-border-icon' onClick={handleStarClick}/> }
    </div>
      {showModal && (
       <EditNoteModal 
          docId={docId} 
          handleExitModal={handleExitModal}
          onUpdate={handleUpdate}
       />
      )}
    </div>
  )
}

export default CardControls; 