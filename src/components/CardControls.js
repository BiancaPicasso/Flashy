import React, { useState } from 'react';
import { useFlashcard } from '../contexts/FlashcardContext';
import { useSpeechSynthesis } from 'react-speech-kit';
import { doc, updateDoc } from 'firebase/firestore';
import db from '../firebase';
import NoteModal from './NoteModal';
import AIModal from './AIModal';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import EditIcon from '@mui/icons-material/Edit';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star'

function CardControls({ docId, front }) {
  const { flashcards, setFlashcards } = useFlashcard();
  const { speak } = useSpeechSynthesis();
  const [showModal, setShowModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  const flashcard = flashcards?.find(fc => fc.docID === docId);
 
  const handleEditClick = (e) => {
    e.stopPropagation();
    setShowModal(true);
  }
  const handleSpeakClick = (e) => {
    e.stopPropagation();
    speak({ text: front ? flashcard.side1 : flashcard.side2 });
  }

  const handleStarClick = async (e) => {
    e.stopPropagation();

    const newStarredStatus = !flashcard.starred;
    const noteRef = doc(db, 'flashcards', docId);
    
    await updateDoc(noteRef, {
      starred: newStarredStatus
    });

    const updatedFlashcards = flashcards.map(fc =>
      fc.docID === docId ? { ...fc, starred: newStarredStatus } : fc
    );
    setFlashcards(updatedFlashcards);
  };

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

  const handleAIAPI = (e) => {
    e.stopPropagation();
    setShowAIModal(!showAIModal);
  }

  const handleCloseAIModal = (e) => {
    e.stopPropagation();
    if (e.currentTarget === e.target) {
      setShowAIModal(false);
    }
  }

  return (
    <div className={`card-controls-wrapper ${showModal ? 'faded' : ''}`}>
      <div className='card-controls'>
        <div className='left-icons'>
          {!front && (
            <button className='explain-button' onClick={handleAIAPI}>
              <AutoAwesomeOutlinedIcon className='explain-icon' />
              <span className='bold'>Explain this</span>
          </button>
          )}
          {showAIModal && (
            <div className="ai-modal-overlay" onClick={handleCloseAIModal}>
            <AIModal docId={docId} onClose={handleCloseAIModal} />
            </div>
          )}
        </div>
        <div className='right-icons'>
          <EditIcon className='edit-icon' onClick={handleEditClick} />
          <VolumeUpIcon className='speak-icon' onClick={handleSpeakClick} />
          {flashcard.starred ? <StarIcon className='star-icon' onClick={handleStarClick} /> : <StarBorderIcon className='star-border-icon' onClick={handleStarClick} />}
        </div>
      </div>
      {showModal && (
        <>
          <div className="overlay" onClick={handleExitModal}></div>
          <NoteModal
            mode="edit"
            docId={docId}
            noteInfo={flashcard}
            onClose={() => setShowModal(false)}
            onSave={handleUpdate}
          />
        </>
      )}
    </div>
  );
}

export default CardControls; 