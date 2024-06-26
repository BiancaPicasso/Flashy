import './App.css';
import Title from './components/Title'
import NoteCards from './components/NoteCards'
import CreateCard from './components/CreateCard'
import { FlashcardProvider } from './contexts/FlashcardContext';

function App() {
  return (
    <div className="App">
      <Title />
      <FlashcardProvider>
        <NoteCards />
      </FlashcardProvider>
    </div>
  );
}

export default App;
