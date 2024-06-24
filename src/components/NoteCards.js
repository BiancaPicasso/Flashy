import React, { useEffect } from 'react';
import Note from './Note';
import { fetchFlashcards } from '../services/flashcardService';
import { FlashcardProvider, useFlashcard } from '../contexts/FlashcardContext';

function NoteCards() {
  const { flashcards, setFlashcards } = useFlashcard();

  useEffect(() => {
    const getFlashcards = async () => {
      try {
        const data = await fetchFlashcards();
        console.log('Fetched flashcards:', data);
        setFlashcards(data);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };
    getFlashcards();
  }, [setFlashcards]);

  return (
    <div>
      {flashcards.map((flashcard) => (
        <Note 
          key={flashcard.docID} 
          docId={flashcard.docID} 
          side1={flashcard.side1} 
          side2={flashcard.side2} 
        />
      ))}
    </div>
  );
}

const NoteCardsWithProvider = () => (
  <FlashcardProvider>
    <NoteCards />
  </FlashcardProvider>
);

export default NoteCardsWithProvider;