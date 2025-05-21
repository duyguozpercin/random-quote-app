
import { useState, useEffect} from 'react';
import ProfilePage from './pages/ProfilePage';
import MainPage from './pages/MainPage';
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
      <nav className='max-w-full bg-white text-sm text-center'>
        <ul className='flex gap-5 justify-end max-w-7xl'>
          <li>
            <button className="text-slate-700 py-3 px-2.5 m-2.5 text-lg" onClick={() => setCurrentPage(pages.home)}>{pages.home}</button>
          </li>
          <li>
            <button className="text-slate-700 py-3 px-2.5 m-2.5 text-lg" onClick={() => setCurrentPage(pages.profile)}>{pages.profile}</button>
          </li>
        </ul>
      </nav>
      {currentPage === pages.home ?
        <MainPage /> : <ProfilePage />}
    </div>
  );
}

export default App;
