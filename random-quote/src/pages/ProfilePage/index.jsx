import { useQuotesContext } from '../../QuotesContextProvider';
import { QuoteCard } from '../../components/QuoteCard';

export const ProfilePage = () => {
  const quotes = useQuotesContext();

  const likedQuotes = quotes.filter((quote) => quote.likeCount > 0);

  return (
    <main>
      <h1>Profile Page</h1>
      <div className="user-info">
        <p>Welcome to your profile! Here's a list of the quotes you've liked so far 💖</p>
      </div>

      <h2>Liked Quotes</h2>

      {likedQuotes.length === 0 ? (
        <p>You haven't liked any quotes yet.</p>
      ) : (
        likedQuotes.map((quote, index) => (
          <QuoteCard
            key={index}
            quote={quote.quote}
            author={quote.author}
            likeCount={quote.likeCount}
          />
        ))
      )}
    </main>
  );
};
