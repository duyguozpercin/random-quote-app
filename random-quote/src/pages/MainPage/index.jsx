import { QuoteCard } from '../../components/QuoteCard'
import { Button } from '../../components/Button'

export const MainPage =({quote, author, likeCount, handleNextQuoteClick, handleLikeClick}) => {
  return (
    <main>
    <QuoteCard
    
        quote={quote}
        author={author}
        likeCount={likeCount}
      />
      <div>
        <Button label="Next Quote" handleOnclick={handleNextQuoteClick} />
        <Button label="Like 💖" handleOnclick={handleLikeClick} />
        
      </div>
      </main>
  )
}