import { useState, useContext } from 'react';
import { useQuotesContext } from '../../QuotesContextProvider';
import { QuoteCard } from '../../components/QuoteCard';
import { AddQuoteForm } from '../../pages/AddQuoteForm';
import { AuthContext } from '../../AuthContext';
import { Button } from '../../components/Button';
import { useQuotesDispatchContext, QuotesActionType } from '../../QuotesContextProvider';


const ProfilePage = () => {
  const quotes = useQuotesContext();
  const authContext = useContext(AuthContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showLikedQuotes, setShowLikedQuotes] = useState(true);
  const dispatch = useQuotesDispatchContext();


  const likedQuotes = quotes.filter((quote) => quote.likeCount > 0);
  const myQuotes = quotes.filter((quote) => quote.userId === authContext?.user?.uid);

  function handleRemove(id: string) {
    dispatch({
      type: QuotesActionType.REMOVE_QUOTE,
      payload: { id }
    });
  }
  


  return (
    <main className="max-w-2xl mx-auto p-4 relative pb-20">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Profile Page</h1>

      {authContext?.user && (
        <div className="flex justify-center space-x-2 mb-6">
          <button
            className={`py-2 px-4 rounded-lg text-base font-medium transition ${showLikedQuotes
            
                ? 'bg-blue-900 text-white'
                : 'bg-white border-pink-400 bg-blue-900 '
              }`}
            onClick={() => setShowLikedQuotes(true)}
          >
            ❤️ Liked
          </button>
          <button
            className={`py-2 px-4 rounded-lg text-base font-medium transition ${!showLikedQuotes
                ? 'bg-blue-900 text-white'
                : 'bg-white bg-blue-900'
              }`}
            onClick={() => setShowLikedQuotes(false)}
          >
            ✍️ Yours
          </button>
        </div>
      )}

      {authContext?.user && (
        <div className="text-center mb-6">
          <Button
            label={showAddForm ? 'Close' : 'Add New Quote'}
            handleOnclick={() => setShowAddForm((prev) => !prev)}
          />
        </div>
      )}

      {showAddForm && (
        <div className="mb-6">
          <AddQuoteForm />
        </div>
      )}

      <div className="user-info text-center mb-5">
        {authContext?.user ? (
          <p className="text-gray-700 text-base">
            Welcome! You can add quotes and see the ones you've liked or written. 📝
          </p>
        ) : (
          <p className="text-gray-500 text-base">
            You're not logged in, but you can still view liked quotes.
          </p>
        )}
      </div>

      <h2 className="text-lg font-semibold mb-3 text-gray-700 text-center">
        {showLikedQuotes ? '❤️ Liked Quotes:' : '✍️ Your Quotes:'}
      </h2>

      {(showLikedQuotes ? likedQuotes : myQuotes).map((quote, index) => (
        <QuoteCard
          key={index}
          quote={quote.quote}
          author={quote.author}
          userName={quote.userName}
          likeCount={showLikedQuotes ? quote.likeCount : undefined}
          showLikes={showLikedQuotes}
          showRemove={true}
          handleRemove={() => handleRemove(quote.id)}
        />
      ))}
    </main>
  );
};

export default ProfilePage;
