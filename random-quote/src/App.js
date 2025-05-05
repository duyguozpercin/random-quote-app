import './App.css';
import { useState, useEffect} from 'react';
import { ProfilePage } from './pages/ProfilePage/index.jsx';
import { MainPage } from './pages/MainPage/index.jsx';
const pages = {
  home: 'Home',
  profile: 'Profile',
};

function App() {
  const savedQuotes = JSON.parse(localStorage.getItem('quotes'));
  const [currentPage, setCurrentPage] = useState(pages.home);

  useEffect(() => {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }, [quotes]);



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
      {currentPage === pages.home ?
        <MainPage /> : <ProfilePage />}
    </div>
  );
}

export default App;
