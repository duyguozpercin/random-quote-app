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
  id: string;
  quote: string;
  author: string;
  likeCount: number;
  userId?: string;
  userName?: string;
}
export enum QuotesActionType {
  SET_QUOTES = "SET_QUOTES",
  LIKE_QUOTE = "LIKE_QUOTE",
  DISLIKE_QUOTE = "DISLIKE_QUOTE",
  ADD_QUOTE = "ADD_QUOTE",
  REMOVE_QUOTE = "REMOVE_QUOTE",
}
type SetQuotesAction = {
  type: QuotesActionType.SET_QUOTES;
  payload: Quote[];
};
type LikeDislikeQuoteAction = {
  type: QuotesActionType.LIKE_QUOTE | QuotesActionType.DISLIKE_QUOTE;
  payload: {
    id: string; 
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
type RemoveQuoteAction = {
  type: QuotesActionType.REMOVE_QUOTE;
  payload: {
    id: string;
  };
};
type QuotesAction =
  | SetQuotesAction
  | LikeDislikeQuoteAction
  | AddQuoteAction
  | RemoveQuoteAction;
const quotesReducer = (state: Quote[], action: QuotesAction): Quote[] => {
  switch (action.type) {
    case QuotesActionType.SET_QUOTES:
      return action.payload;
    case QuotesActionType.LIKE_QUOTE:
      return state.map((quote) =>
        quote.id === action.payload.id
          ? { ...quote, likeCount: quote.likeCount + 1 }
          : quote
      );
    case QuotesActionType.DISLIKE_QUOTE:
      return state.map((quote) => {
        if (quote.id === action.payload.id) {
          if (quote.likeCount === 0) {
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
          id: crypto.randomUUID(),
          quote: action.payload.quote,
          author: action.payload.author,
          likeCount: 0,
          userId: action.payload.userId,
          userName: action.payload.userName,
        },
      ];
    case QuotesActionType.REMOVE_QUOTE:
      return state.filter((quote) => quote.id !== action.payload.id);
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
  : [];

const [quotes, dispatch] = useReducer(
  quotesReducer,
  parsedQuotes.length > 0 ? parsedQuotes : initialQuotesData
);

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