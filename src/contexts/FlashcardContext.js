import React, { createContext, useContext, useState } from 'react';

const FlashcardContext = createContext();

export const useFlashcard = () => useContext(FlashcardContext);

export const FlashcardProvider = ({ children }) => {
  const [flashcards, setFlashcards] = useState([]);

  return (
    <FlashcardContext.Provider value={{ flashcards, setFlashcards }}>
      {children}
    </FlashcardContext.Provider>
  );
};