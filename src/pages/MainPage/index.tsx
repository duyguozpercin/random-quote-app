import { QuoteCard } from '../../components/QuoteCard';
import { Button } from '../../components/Button';
import {
  useQuotesContext,
  useQuotesDispatchContext,
  QuotesActionType
} from '../../QuotesContextProvider';
import {
  useQuoteIndexContext,
  useQuoteIndexDispatchContext,
} from '../../QuoteIndexContextProvider';

const MainPage = () => {
  const quotes = useQuotesContext();
  const dispatch = useQuotesDispatchContext();
  const currentIndex = useQuoteIndexContext();
  const dispatchQuoteIndex = useQuoteIndexDispatchContext();

  const currentQuote = quotes[currentIndex];



  function handleNextQuoteClick() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    dispatchQuoteIndex(randomIndex);
  }

  function handleLikeClick() {
    if (!currentQuote) return;
    dispatch({
      type: QuotesActionType.LIKE_QUOTE,
      payload: { id: currentQuote.id },
    });
  }

  function handleDislikeClick() {
    if (!currentQuote) return;
    dispatch({
      type: QuotesActionType.DISLIKE_QUOTE,
      payload: { id: currentQuote.id },
    });
  }

  return (
    <main>
      {currentQuote && (
        <QuoteCard
          quote={currentQuote.quote}
          author={currentQuote.author}
          userName={currentQuote.userName}
          likeCount={currentQuote.likeCount}
        />
      )}
      <div className="flex justify-center gap-1">
        <Button label="Next Quote" handleOnclick={handleNextQuoteClick} />
        <Button label="Like 💖" handleOnclick={handleLikeClick} />
        <Button
          label="Dislike 👎"
          handleOnclick={handleDislikeClick}
          disabled={!currentQuote || currentQuote.likeCount === 0}
        />
      </div>
    </main>
  );
};

export default MainPage;
