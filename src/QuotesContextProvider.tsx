import React, { createContext, useState, useEffect, useContext } from 'react';
import { quotes as initialQuotes } from './quotes';
import { ReactNode } from 'react';
export const QuotesContext = createContext<Quote[] | undefined>(undefined);
export const QuotesDispatchContext = createContext<React.Dispatch<React.SetStateAction<Quote[]>>| undefined>(undefined);

export interface Quote {
  quote: string;
  author: string;
  likeCount: number;
}

interface QuotesContextProviderProps {
  children: ReactNode;
}

export const QuotesContextProvider = ({ children }: QuotesContextProviderProps) => {
  const savedQuotes = localStorage.getItem('quotes') ? JSON.parse(localStorage.getItem('quotes') as string) : null;
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