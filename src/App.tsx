import { useState, useEffect, useContext } from 'react';
import ProfilePage from './pages/ProfilePage';
import MainPage from './pages/MainPage';
import { useQuotesContext } from './QuotesContextProvider';
import { CreateUserPage } from './pages/CreateUserPage';
import { LoginPage } from './pages/LoginPage';
import { AuthContext } from './AuthContext';

enum Page {
  home = "Home",
  profile = "Profile",
  createUserPage = "Create Account",
  login = "Log In",
}

const allPages = Object.values(Page);

function App() {
  const quotes = useQuotesContext();
  const [currentPage, setCurrentPage] = useState<Page>(Page.home);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }, [quotes]);

  function renderPage() {
    switch (currentPage) {
      case Page.home:
        return <MainPage />;
      case Page.profile:
        return authContext?.user ? (
          <ProfilePage />
        ) : (
          <p className="text-center mt-10 text-red-600 text-lg">Please log in to view your profile.</p>
        );
      case Page.createUserPage:
        return (
          <CreateUserPage key={authContext?.user ? 'auth-user' : 'auth-guest'} />
        );
        case Page.login:
          return (
            <LoginPage
              key={authContext?.user ? 'auth-user' : 'auth-guest'}
              onLoginSuccess={() => setCurrentPage(Page.home)}
            />
          );
      default:
        return <MainPage />;
    }
  }

  return (
    <div>
      <nav className="max-w-full bg-white text-sm text-center">
        <ul className="flex gap-5 justify-end max-w-7xl">
          <li>
            <button className="text-slate-700 py-3 px-2.5 m-2.5 text-lg" onClick={() => setCurrentPage(Page.home)}>
              Home
            </button>
          </li>
          <li>
            <button className="text-slate-700 py-3 px-2.5 m-2.5 text-lg" onClick={() => setCurrentPage(Page.profile)}>
              Profile
            </button>
          </li>
          {!authContext?.user && (
            <>
              <li>
                <button className="text-slate-700 py-3 px-2.5 m-2.5 text-lg" onClick={() => setCurrentPage(Page.createUserPage)}>
                  Create Account
                </button>
              </li>
              <li>
                <button className="text-slate-700 py-3 px-2.5 m-2.5 text-lg" onClick={() => setCurrentPage(Page.login)}>
                  Log In
                </button>
              </li>
            </>
          )}
          {authContext?.user && (
            <li>
              <button
                className="text-slate-700 py-3 px-2.5 m-2.5 text-lg"
                onClick={() => {
                  authContext.logOut();
                  setCurrentPage(Page.home);
                }}
              >
                Log Out
              </button>
            </li>
          )}
        </ul>
      </nav>
      {renderPage()}
    </div>
  );
}

export default App;