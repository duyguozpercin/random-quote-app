import { createContext, useState, useEffect, useContext } from 'react';
import { quotes as initialQuotes } from './quotes.js';

export const QuotesContext = createContext(undefined);
export const QuotesDispatchContext = createContext(undefined);

export const QuotesContextProvider = ({children}) => {
  const savedQuotes = JSON.parse(localStorage.getItem('quotes'));
  const [quotes, setQuotes] = useState(savedQuotes || initialQuotes);

  useEffect(() => {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }, [quotes]);

  return (
    <QuotesContext.Provider value={quotes}>
      <QuotesDispatchContext.Provider value={setQuotes}>
      {children}
      </QuotesDispatchContext.Provider>
    </QuotesContext.Provider>
  );
};

export const useQuotesContext = ()=> useContext(QuotesContext);
export const useQuotesDispatchContext = ()=> useContext(QuotesDispatchContext);