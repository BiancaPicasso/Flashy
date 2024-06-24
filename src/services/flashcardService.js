import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase';

export const fetchFlashcards = async () => {
  const flashcardsCol = collection(db, 'flashcards');
  const flashcardsSnapshot = await getDocs(flashcardsCol);
  const flashcardsList = flashcardsSnapshot.docs.map(doc => ({
    docID: doc.id, 
    ...doc.data()
  }));
  return flashcardsList;
};
