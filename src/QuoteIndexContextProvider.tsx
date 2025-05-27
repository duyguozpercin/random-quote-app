import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from "react";


export const QuoteIndexContext = createContext<number | undefined>(undefined);

export const QuoteIndexDispatchContext = createContext<Dispatch<SetStateAction<number>> | undefined>(undefined);


interface QuoteIndexProviderProps {
  children: ReactNode;
}

export const QuoteIndexContextProvider = ({ children }: QuoteIndexProviderProps) => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  return (
    <QuoteIndexContext.Provider value={quoteIndex}>
      <QuoteIndexDispatchContext.Provider value={setQuoteIndex}>
        {children}
      </QuoteIndexDispatchContext.Provider>
    </QuoteIndexContext.Provider>
  );
};


export const useQuoteIndexContext = (): number => {
  const context = useContext(QuoteIndexContext);
  if (context === undefined) {
    throw new Error("useQuoteIndexContext must be used within a QuoteIndexContextProvider");
  }
  return context;
};

export const useQuoteIndexDispatchContext = (): Dispatch<SetStateAction<number>> => {
  const context = useContext(QuoteIndexDispatchContext);
  if (context === undefined) {
    throw new Error("useQuoteIndexDispatchContext must be used within a QuoteIndexContextProvider");
  }
  return context;
};
