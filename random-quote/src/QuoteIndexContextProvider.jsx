import { createContext, useState, useContext } from 'react';
import { quotes as initialQuotes } from './quotes.js';

export const QuoteIndexContext = createContext(undefined);
export const QuoteIndexDispatchContext = createContext(undefined);

export const QuoteIndexContextProvider = ({children}) => {
  const [quoteIndex, setQuotesIndex] = useState(0);
  return (
    <QuoteIndexContext value={quoteIndex}>
      <QuoteIndexDispatchContext value={setQuotesIndex}>
      {children}
      </QuoteIndexDispatchContext>
    </QuoteIndexContext>
  );
};

export const useQuoteIndexContext = ()=> useContext(QuoteIndexContext);
export const useQuoteIndexDispatchContext = ()=> useContext(QuoteIndexDispatchContext);