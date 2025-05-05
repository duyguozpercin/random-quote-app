import { createContext, useState, useContext } from 'react';
import { quotes as initialQuotes } from './quotes.js';

export const QuotesContext = createContext(undefined);
export const QuotesDispatchContext = createContext(undefined);

export const QuotesContextProvider = ({children}) => {
  const [quotes, setQuotes] = useState(initialQuotes);
  return (
    <QuotesContext value={quotes}>
      <QuotesDispatchContext value={setQuotes}>
      {children}
      </QuotesDispatchContext>
    </QuotesContext>
  );
};

export const useQuotesContext = ()=> useContext(QuotesContext);
export const useQuotesDispatchContext = ()=> useContext(QuotesDispatchContext);