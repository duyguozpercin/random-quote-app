
import { useState, useEffect } from 'react';
import ProfilePage from './pages/ProfilePage';
import MainPage from './pages/MainPage';
import { useQuotesContext } from './QuotesContextProvider';


enum Page {
  home = "Home",
  profile = "Profile",
};

const allPages = Object.values(Page);

function App() {
  const quotes = useQuotesContext();
  const [currentPage, setCurrentPage] = useState<Page>(Page.home);

  useEffect(() => {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }, [quotes]);



  return (
    <div>
      <nav className='max-w-full bg-white text-sm text-center'>
        <ul className='flex gap-5 justify-end max-w-7xl'>
          {allPages.map(page => (
            <li>
              <button className="text-slate-700 py-3 px-2.5 m-2.5 text-lg" onClick={() => setCurrentPage(page)}>{page}</button>
            </li>
          ))}

        </ul>
      </nav>
      {currentPage === Page.home ?
        <MainPage /> : <ProfilePage />}
    </div>
  );
}

export default App;
