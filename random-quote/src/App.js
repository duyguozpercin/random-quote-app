import { quotes as initialQuotes } from './quotes.js';
import './App.css';
import { useState, useEffect } from 'react';
import { ProfilePage } from './pages/ProfilePage/index.jsx';
import { MainPage } from './pages/MainPage/index.jsx';

const pages = {
  home: 'Home',
  profile: 'Profile',
};

function App() {
  const savedQuotes = JSON.parse(localStorage.getItem('quotes'));
  const [quotes, setQuotes] = useState(savedQuotes || initialQuotes);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(pages.home);

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
      <nav>
        <ul>
          <li>
            <button onClick={() => setCurrentPage(pages.home)}>{pages.home}</button>
          </li>
          <li>
            <button onClick={() => setCurrentPage(pages.profile)}>{pages.profile}</button>
          </li>
        </ul>
      </nav>
      {currentPage === pages.home ? <MainPage quote={quotes[currentIndex].quote}
        author={quotes[currentIndex].author}
        likeCount={quotes[currentIndex].likeCount}
        handleNextQuoteClick={handleNextQuoteClick}
        handleLikeClick={handleLikeClick} /> : <ProfilePage />}




    </div>
  );
}

export default App;
