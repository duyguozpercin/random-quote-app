import { useState } from "react";
import {
  useQuotesDispatchContext,
  QuotesActionType
} from "../QuotesContextProvider";
import { useAuthContext } from "../AuthContext";

export const AddQuoteForm = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useQuotesDispatchContext();
  const authContext = useAuthContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authContext?.user) {
      alert("Please log in to add a quote.");
      return;
    }

    if (quote.trim() && author.trim()) {
      dispatch({
        type: QuotesActionType.ADD_QUOTE,
        payload: {
          quote,
          author,
          userId: authContext.user.uid,
          userName: authContext.user.displayName ?? authContext.user.email ?? "Unknown"

        }
      });
      setQuote("");
      setAuthor("");
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-6 space-y-5 max-w-lg mx-auto border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-center text-yellow-500">Add a New Quote</h2>

      <div className="flex flex-col">
        <label className="text-sm text-yellow-500 mb-1 font-medium" htmlFor="quote">
          Quote
        </label>
        <textarea
          id="quote"
          rows={3}
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="Write an inspiring quote..."
          className="p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-yellow-500 mb-1 font-medium" htmlFor="author">
          Author
        </label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="e.g. Albert Einstein"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-950 font-semibold py-2.5w-full text-white font-semibold py-2.5 rounded-md hover:bg-blue-900 transition duration-200rounded-md hover:bg-blue-900 transition duration-200"
      >
        Submit Quote
      </button>
    </form>
  );
};
