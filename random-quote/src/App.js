import './App.css';
import { useState, useEffect} from 'react';
import { ProfilePage } from './pages/ProfilePage/index.jsx';
import { MainPage } from './pages/MainPage/index.jsx';
import { useQuotesContext } from './QuotesContextProvider';




const pages = {
  home: 'Home',
  profile: 'Profile',
};

function App() {
  const quotes = useQuotesContext();
  const [currentPage, setCurrentPage] = useState(pages.home);

  useEffect(() => {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }, [quotes]);



  return (
    <div>
      <nav>
        <ul>
          <li>
            <button className="HeaderBtn" onClick={() => setCurrentPage(pages.home)}>{pages.home}</button>
          </li>
          <li>
            <button className="HeaderBtn" onClick={() => setCurrentPage(pages.profile)}>{pages.profile}</button>
          </li>
        </ul>
      </nav>
      {currentPage === pages.home ?
        <MainPage /> : <ProfilePage />}
    </div>
  );
}

export default App;
