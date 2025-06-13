import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
  useEffect
} from "react";
import { quotes as initialQuotesData } from "./quotes";

export interface Quote {
  quote: string;
  author: string;
  likeCount: number;
  userId: string;
  userName: string;
}

export enum QuotesActionType {
  SET_QUOTES = "SET_QUOTES",
  LIKE_QUOTE = "LIKE_QUOTE",
  DISLIKE_QUOTE = "DISLIKE_QUOTE",
  ADD_QUOTE = 'ADD_QUOTE',
}

type SetQuotesAction = {
  type: QuotesActionType.SET_QUOTES;
  payload: Quote[];
};

type LikeDislikeQuoteAction = {
  type: QuotesActionType.LIKE_QUOTE | QuotesActionType.DISLIKE_QUOTE;
  payload: {
    index: number;
  };
};

type AddQuoteAction = {
  type: QuotesActionType.ADD_QUOTE;
  payload: {
    quote: string;
    author: string;
    userId: string;
    userName: string;
  };
};

type QuotesAction = SetQuotesAction | LikeDislikeQuoteAction | AddQuoteAction;

const quotesReducer = (state: Quote[], action: QuotesAction): Quote[] => {
  switch (action.type) {
    case QuotesActionType.SET_QUOTES:
      return action.payload;

    case QuotesActionType.LIKE_QUOTE:
      return state.map((quote, i) =>
        i === action.payload.index
          ? { ...quote, likeCount: quote.likeCount + 1 }
          : quote
      );

    case QuotesActionType.DISLIKE_QUOTE:
      return state.map((quote, i) => {
        if (i === action.payload.index) {
          if (quote.likeCount === 0) {
            alert("You can not dislike this quote!");
            return quote;
          }
          return { ...quote, likeCount: quote.likeCount - 1 };
        }
        return quote;
      });

      case QuotesActionType.ADD_QUOTE:
        return [
          ...state,
          {
            quote: action.payload.quote,
            author: action.payload.author,
            likeCount: 0,
            userId: action.payload.userId,
            userName: action.payload.userName,
          },
        ];
      

    default:
      console.error("Unsupported action type", action);
      return state;
  }
};

export const QuotesContext = createContext<Quote[] | undefined>(undefined);

export const QuotesDispatchContext = createContext<
  Dispatch<QuotesAction> | undefined
>(undefined);

interface QuotesContextProviderProps {
  children: ReactNode;
}

export const QuotesContextProvider = ({
  children
}: QuotesContextProviderProps) => {
  const savedQuotes = localStorage.getItem("quotes");
  const parsedQuotes: Quote[] = savedQuotes
    ? JSON.parse(savedQuotes)
    : initialQuotesData;

  const [quotes, dispatch] = useReducer(quotesReducer, parsedQuotes);

  useEffect(() => {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }, [quotes]);

  return (
    <QuotesContext.Provider value={quotes}>
      <QuotesDispatchContext.Provider value={dispatch}>
        {children}
      </QuotesDispatchContext.Provider>
    </QuotesContext.Provider>
  );
};

export const useQuotesContext = () => {
  const context = useContext(QuotesContext);
  if (!context) {
    throw new Error("useQuotesContext must be used within a QuotesContextProvider");
  }
  return context;
};

export const useQuotesDispatchContext = () => {
  const context = useContext(QuotesDispatchContext);
  if (!context) {
    throw new Error("useQuotesDispatchContext must be used within a QuotesContextProvider");
  }
  return context;
};
