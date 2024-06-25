import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchFlashcards } from '../services/flashcardService';

const FlashcardContext = createContext();

export const useFlashcard = () => useContext(FlashcardContext);

export const FlashcardProvider = ({ children }) => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const initializeFlashcards = async () => {
      try {
        const data = await fetchFlashcards();
        setFlashcards(data);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    initializeFlashcards();
  }, []);

  return (
    <FlashcardContext.Provider value={{ flashcards, setFlashcards }}>
      {children}
    </FlashcardContext.Provider>
  );
};