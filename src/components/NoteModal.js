import React, { useState, useEffect } from 'react';
import { doc, updateDoc, collection, addDoc, deleteDoc } from 'firebase/firestore';
import { useFlashcard } from '../contexts/FlashcardContext';
import db from '../firebase';

function NoteModal({ mode, noteInfo, onClose, onSave }) {
  const { flashcards, setFlashcards } = useFlashcard();

  const [side1, setSide1] = useState('');
  const [side2, setSide2] = useState('');

  useEffect(() => {
    if (noteInfo) {
      setSide1(noteInfo.side1);
      setSide2(noteInfo.side2);
    }
  }, [noteInfo]);

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (mode === 'edit' && noteInfo.docID) {
      const noteRef = doc(db, 'flashcards', noteInfo.docID);
      try {
        await updateDoc(noteRef, {
          side1,
          side2
        });
        onSave(noteInfo.docID, { side1, side2 });
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    } else if (mode === 'create') {
      try {
        const docRef = await addDoc(collection(db, 'flashcards'), {
          side1,
          side2
        });
        onSave(docRef.id, { side1, side2 });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }

    onClose();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

      try {
        await deleteDoc(doc(db, 'flashcards', noteInfo.docID));
        const updatedFlashcards = flashcards.filter(fc => fc.docID !== noteInfo.docID);
        setFlashcards(updatedFlashcards);
        onClose();
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
  };

  return (
    <div className='modal' onClick={(e) => e.stopPropagation()}>
      <form onSubmit={handleSave}>
        <button type="button" className='modal-exit-button' onClick={onClose}>X</button>
        <div className='modal-editing'>
          <h3 className='modal-header'>{mode === 'edit' ? 'Edit' : 'New'}</h3>
          <textarea
            className="modal-line-1"
            name='modal-line-1'
            value={side1}
            onChange={(e) => setSide1(e.target.value)}
          />
          <textarea
            className="modal-line-2"
            name='modal-line-2'
            value={side2}
            onChange={(e) => setSide2(e.target.value)}
          />
        </div>
        <div className='modal-bottom-buttons'>
          {mode === 'edit' && 
            <button 
              className='delete-modal-button' 
              type="button" 
              onClick={handleDelete}
            >
              Delete
            </button>}
          <button className='save-modal-button' type='submit'>Save</button>
        </div>
      </form>
    </div>
  );
}

export default NoteModal;

