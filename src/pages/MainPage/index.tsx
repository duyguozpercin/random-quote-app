import { QuoteCard } from '../../components/QuoteCard'
import { Button } from '../../components/Button'
import { useQuotesContext } from "../../QuotesContextProvider";
import {
  useQuoteIndexContext,
  useQuoteIndexDispatchContext,
} from "../../QuoteIndexContextProvider";
import { useQuotesDispatchContext } from "../../QuotesContextProvider";



const MainPage = () => {
  const quotes = useQuotesContext();
  const setQuotes = useQuotesDispatchContext();
  const currentIndex = useQuoteIndexContext();
  const dispatchQuoteIndex = useQuoteIndexDispatchContext();


  function handleNextQuoteClick() {
    const randomIndex = Math.floor(Math.random() * (quotes?.length ?? 0));
    if (dispatchQuoteIndex) {
      dispatchQuoteIndex(randomIndex);
    }
  }

  function handleLikeClick() {
    const updatedQuotes = [...(quotes ?? [])];
    if (typeof currentIndex === 'number' && updatedQuotes[currentIndex]) {
      updatedQuotes[currentIndex].likeCount += 1;
    }
    if (setQuotes) {
      setQuotes(updatedQuotes);
    }

  }

  return (
    <main>
      {quotes && typeof currentIndex === 'number' && quotes[currentIndex] && (
        <QuoteCard
          quote={quotes[currentIndex].quote}
          author={quotes[currentIndex].author}
          likeCount={quotes[currentIndex].likeCount}
        />
      )}
      <div className="flex justify-center gap-1">
        <Button label="Next Quote" handleOnclick={handleNextQuoteClick} />
        <Button label="Like 💖" handleOnclick={handleLikeClick} />

      </div>
    </main>
  )
}

export default MainPage;