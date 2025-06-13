import { Quote } from '../../QuotesContextProvider';

interface QuoteCardProps {
  quote: string;
  author: string;
  userName?: string;
  likeCount?: number;
  showLikes?: boolean;
}

export const QuoteCard = ({ quote, author, userName, likeCount = 0, showLikes = true }: QuoteCardProps) => {
  return (
    <section className="max-w-2xl bg-white p-10 rounded-xl text-sm my-5 mx-auto text-gray-600 text-center">
      <p className="italic mb-5">{quote}</p>
      <p className="text-slate-500">— {author}</p>

      {userName && (
        <p className="mt-2 text-xs text-gray-400">Added by: {userName}</p>
      )}


      {showLikes && typeof likeCount === 'number' && (
        <p className="mt-4 text-fuchsia-400 text-xs">💖 Likes: {likeCount}</p>
      )}
    </section>
  );
};
