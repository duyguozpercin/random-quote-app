import { quotes as initialQuotes } from './quotes.js';
import './App.css';
import { QuoteCard } from './components/QuoteCard/index.js';
import { useState, useEffect } from 'react';
import { Button } from './components/Button/index.jsx';

function App() {
  const savedQuotes = JSON.parse(localStorage.getItem('quotes'));
  const [quotes, setQuotes] = useState(savedQuotes || initialQuotes);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }, [quotes]);

  function handleNextQuoteClick() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentIndex(randomIndex);
  }

  function handleLikeClick() {
    const updatedQuotes = [...quotes];
    updatedQuotes[currentIndex].likeCount += 1;
    setQuotes(updatedQuotes);
  }

  return (
    <div className="App">
      <QuoteCard
        quote={quotes[currentIndex].quote}
        author={quotes[currentIndex].author}
        likeCount={quotes[currentIndex].likeCount}
      />
      <div>
        <Button label="Next Quote" handleOnclick={handleNextQuoteClick} />
        <Button label="Like 💖" handleOnclick={handleLikeClick} />
        
      </div>
    </div>
  );
}

export default App;
