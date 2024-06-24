import React from 'react';
import {doc, updateDoc} from 'firebase/firestore';
import db from '../firebase';
import { useFlashcard } from '../contexts/FlashcardContext';

function EditNoteModal({ docId, handleExitModal, onUpdate }) {
  const { flashcards } = useFlashcard();
  const flashcard = flashcards?.find(fc => fc.docID === docId);

  const updateForm = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.target);
    const question = formData.get("modal-line-1")
    const answer = formData.get("modal-line-2")

    const noteRef = doc(db, 'flashcards', docId);
    try {
      await updateDoc(noteRef, {
        side1: question,
        side2: answer
      });
      onUpdate(docId, { side1: question, side2: answer })
      handleExitModal()
    } catch(error) {
      console.log("Error updating form ", error);
    }
  }


  return (
    <div className='edit-modal' onClick={(e) => e.stopPropagation()}>
      <form onSubmit={updateForm}>
        <button type="button" className='modal-exit-button' onClick={handleExitModal}>X</button>
        <div className='modal-editing'>
          <h3 className='modal-header'>Edit</h3>
          <textarea className="modal-line-1" name='modal-line-1' defaultValue={flashcard.side1}></textarea>
          <textarea className="modal-line-2" name='modal-line-2' defaultValue={flashcard.side2}></textarea>
        </div>
        <div className='modal-bottom-buttons'>
          <button className='delete-modal-button' type="button">Delete</button>
          <button className='save-modal-button' type='submit'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default EditNoteModal;