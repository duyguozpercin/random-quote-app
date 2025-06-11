import { useQuotesContext } from '../../QuotesContextProvider';
import { QuoteCard } from '../../components/QuoteCard';
import { useAuthContext } from '../../AuthContext';

const ProfilePage = () => {
  const quotes = useQuotesContext();
  const authContext = useAuthContext();

  const likedQuotes = quotes.filter((quote) => quote.likeCount > 0);

  return (
    <main className="max-w-3xl mx-auto p-6 mt-10 border border-gray-200 rounded-lg shadow bg-white">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Profile Page</h1>

      {authContext?.user && (
        <p className="text-center text-green-700 mb-6">
          Welcome, <span className="font-semibold">{authContext.user.email}</span> 🎉
        </p>
      )}


      <h2 className="text-lg font-semibold text-slate-700 text-center mb-4">
        Liked Quotes:
      </h2>

      {likedQuotes.length === 0 ? (
        <p className="text-center text-gray-500">You haven't liked any quotes yet.</p>
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

export default ProfilePage;
