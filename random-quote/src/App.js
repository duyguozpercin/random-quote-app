
import { quotes as initialQuotes } from './quotes.js';
import './App.css';
import { QuoteCard } from './components/QuoteCard/index.js';
import { useState } from 'react';

function App() {
  // const [state, setState] = useState(initialState)
  const [quotes, setQuotes] = useState(initialQuotes);
  const [currentIndex, setCurrentIndex] = useState(0);


  function handleNextQuoteClick () {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    // THIS IS NOT CORRECT: currentIndex = randomIndex;
    setCurrentIndex(randomIndex);

  }

  return (
    // JSX
    <div className="App">
      <QuoteCard quote={quotes[currentIndex].quote} author={quotes[currentIndex].author} />

      <button onClick={handleNextQuoteClick}>Next quote</button>
    </div>
  );
}
export default App;
