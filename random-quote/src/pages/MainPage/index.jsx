import { QuoteCard } from '../../components/QuoteCard'
import { Button } from '../../components/Button'
import { useQuotesContext } from "../../QuotesContextProvider";
import {
  useQuoteIndexContext,
  useQuoteIndexDispatchContext,
} from "../../QuoteIndexContextProvider";
import { useQuotesDispatchContext } from "../../QuotesContextProvider";



export const MainPage = () => {
  const quotes = useQuotesContext();
  const setQuotes = useQuotesDispatchContext();
  const currentIndex = useQuoteIndexContext();
  const dispatchQuoteIndex = useQuoteIndexDispatchContext();

  
  function handleNextQuoteClick() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    dispatchQuoteIndex(randomIndex);
  }

  function handleLikeClick() {
    const updatedQuotes = [...quotes];
    updatedQuotes[currentIndex].likeCount += 1;
    setQuotes(updatedQuotes); 
    
  }

  return (
    <main>
    <QuoteCard
    
        quote={quotes[currentIndex].quote}
        author={quotes[currentIndex].author}
        likeCount={quotes[currentIndex].likeCount}
      />
      <div className="flex justify-center gap-1">
        <Button label="Next Quote" handleOnclick={handleNextQuoteClick} />
        <Button label="Like 💖" handleOnclick={handleLikeClick} />
        
      </div>
      </main>
  )
}