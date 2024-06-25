import React, { useState, useEffect } from 'react';
import { doc, updateDoc, collection, addDoc } from 'firebase/firestore';
import db from '../firebase';

function NoteModal({ mode, initialData, onClose, onSave }) {
  const [side1, setSide1] = useState('');
  const [side2, setSide2] = useState('');

  useEffect(() => {
    if (initialData) {
      setSide1(initialData.side1);
      setSide2(initialData.side2);
    }
  }, [initialData]);

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (mode === 'edit' && initialData.docID) {
      const noteRef = doc(db, 'flashcards', initialData.docID);
      try {
        await updateDoc(noteRef, {
          side1,
          side2
        });
        onSave(initialData.docID, { side1, side2 });
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
          {mode === 'edit' && <button className='delete-modal-button' type="button">Delete</button>}
          <button className='save-modal-button' type='submit'>Save</button>
        </div>
      </form>
    </div>
  );
}

export default NoteModal;

